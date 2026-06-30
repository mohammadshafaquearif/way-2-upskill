import React, { useMemo, useRef, useState } from 'react';
import { Download, Search, Upload, UserCheck } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CONTACT_STATUSES } from '@/lib/adminConstants';
import { countLeadsByAgent } from '@/lib/adminAgents';
import { ADMIN_SAVE_FAILED, logAdminError, toSafeAdminMessage } from '@/lib/adminErrors';
import type { AdminAgent, AdminContact, ContactLeadStatus } from '@/lib/adminTypes';

interface AdminContactsProps {
  contacts: AdminContact[];
  agents: AdminAgent[];
  isSuperAdmin: boolean;
  currentUserEmail: string;
  onRefresh: () => void;
}

const statusVariant: Record<ContactLeadStatus, 'default' | 'secondary' | 'outline'> = {
  new: 'default',
  contacted: 'secondary',
  converted: 'outline',
};

const AdminContacts = ({
  contacts,
  agents,
  isSuperAdmin,
  currentUserEmail,
  onRefresh,
}: AdminContactsProps) => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const agentCounts = useMemo(() => countLeadsByAgent(contacts), [contacts]);

  const maskEmail = (value: string) => {
    const email = String(value || '').trim();
    const at = email.indexOf('@');
    if (at <= 0) return email;
    const local = email.slice(0, at);
    const domain = email.slice(at + 1);
    const [domainName, ...rest] = domain.split('.');
    const tld = rest.length ? `.${rest.join('.')}` : '';
    const localMasked = local.length <= 2 ? `${local[0] ?? ''}***` : `${local.slice(0, 2)}***`;
    const domainMasked =
      domainName.length <= 2 ? `${domainName[0] ?? ''}***` : `${domainName.slice(0, 2)}***`;
    return `${localMasked}@${domainMasked}${tld}`;
  };

  const parseCsv = (text: string) => {
    const rows: string[][] = [];
    let cur = '';
    let row: string[] = [];
    let inQuotes = false;

    const pushCell = () => {
      row.push(cur);
      cur = '';
    };

    const pushRow = () => {
      if (row.length === 1 && row[0].trim() === '') return;
      rows.push(row.map((c) => c.trim()));
      row = [];
    };

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        const next = text[i + 1];
        if (inQuotes && next === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (!inQuotes && ch === ',') {
        pushCell();
        continue;
      }
      if (!inQuotes && (ch === '\n' || ch === '\r')) {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        pushCell();
        pushRow();
        continue;
      }
      cur += ch;
    }
    pushCell();
    pushRow();
    return rows;
  };

  const normalizeHeader = (h: string) =>
    h
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z0-9 ]/g, '')
      .trim();

  const splitName = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return { first_name: '', last_name: '' };
    if (parts.length === 1) return { first_name: parts[0], last_name: '' };
    return { first_name: parts[0], last_name: parts.slice(1).join(' ') };
  };

  const toIsoDate = (value: string) => {
    const v = value.trim();
    if (!v) return undefined;
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return undefined;
    return d.toISOString();
  };

  const downloadCsv = (filename: string, csv: string) => {
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const escapeCsv = (value: string) => {
    const v = value ?? '';
    if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
  };

  const importLeadsCsv = async (file: File) => {
    setImporting(true);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      if (rows.length < 2) {
        toast({
          title: 'Invalid CSV',
          description: 'CSV must include a header row and at least one data row.',
          variant: 'destructive',
        });
        return;
      }

      const header = rows[0].map(normalizeHeader);
      const idx = (names: string[]) => header.findIndex((h) => names.includes(h));

      const nameIdx = idx(['name', 'full name', 'fullname']);
      const emailIdx = idx(['email', 'email address', 'emailaddress']);
      const phoneIdx = idx(['phone', 'phone number', 'phonenumber', 'mobile', 'mobile number']);
      const assignedToIdx = idx(['assigned to', 'assignedto', 'assigned', 'agent', 'agent email']);
      const dateIdx = idx(['date', 'created at', 'createdat', 'created']);

      if (emailIdx === -1) {
        toast({
          title: 'Missing required column',
          description: 'CSV must include an "email" column.',
          variant: 'destructive',
        });
        return;
      }

      const payload = rows.slice(1).map((r) => {
        const name = nameIdx >= 0 ? (r[nameIdx] ?? '') : '';
        const split = splitName(name);
        const email = (r[emailIdx] ?? '').trim();
        const phone = phoneIdx >= 0 ? (r[phoneIdx] ?? '').trim() : '';
        const assigned_to = isSuperAdmin
          ? (assignedToIdx >= 0 ? (r[assignedToIdx] ?? '').trim() : '')
          : currentUserEmail;
        const created_at = dateIdx >= 0 ? toIsoDate(r[dateIdx] ?? '') : undefined;

        const first = split.first_name || (email ? email.split('@')[0] : '');
        return {
          first_name: first,
          last_name: split.last_name,
          email,
          phone: phone || null,
          assigned_to: assigned_to || null,
          created_at,
        };
      });

      const { inserted } = await apiClient.bulkUpsertAdminContacts(payload);

      toast({
        title: 'CSV import complete',
        description: `${inserted} lead(s) added/updated.`,
      });
      onRefresh();
    } catch (error) {
      logAdminError('import contact leads csv', error);
      toast({
        title: 'Import failed',
        description: toSafeAdminMessage(error, ADMIN_SAVE_FAILED),
        variant: 'destructive',
      });
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contacts.filter((c) => {
      const matchesSearch =
        !q ||
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone || '').includes(q);

      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

      const matchesAgent =
        !isSuperAdmin ||
        agentFilter === 'all' ||
        (agentFilter === 'unassigned' && !c.assigned_to) ||
        (c.assigned_to ?? '').toLowerCase() === agentFilter;

      return matchesSearch && matchesStatus && matchesAgent;
    });
  }, [contacts, search, statusFilter, agentFilter, isSuperAdmin]);

  const exportLeadsCsv = () => {
    const header = ['name', 'email', 'phoneNumber', 'assignedTo', 'date'];
    const lines = [
      header.join(','),
      ...filtered.map((c) => {
        const name = `${c.first_name} ${c.last_name}`.trim();
        const date = c.created_at ? new Date(c.created_at).toISOString() : '';
        return [
          escapeCsv(name),
          escapeCsv(c.email || ''),
          escapeCsv(c.phone || ''),
          escapeCsv(c.assigned_to || ''),
          escapeCsv(date),
        ].join(',');
      }),
    ];
    downloadCsv(`contact-leads-${new Date().toISOString().slice(0, 10)}.csv`, lines.join('\n'));
  };

  const updateStatus = async (id: string, status: ContactLeadStatus) => {
    try {
      await apiClient.updateAdminContactStatus(id, status);
      toast({ title: 'Lead status updated' });
      onRefresh();
    } catch (error) {
      logAdminError('update contact status', error);
      toast({
        title: 'Update failed',
        description: toSafeAdminMessage(error, ADMIN_SAVE_FAILED),
        variant: 'destructive',
      });
    }
  };

  const assignLead = async (contactId: string, assigneeEmail: string) => {
    setAssigningId(contactId);
    try {
      const { emailSent } = await apiClient.assignAdminContact(contactId, assigneeEmail);
      toast({
        title: 'Lead assigned',
        description: emailSent
          ? `Notification sent to ${assigneeEmail}`
          : `Assigned to ${assigneeEmail}. Email notification could not be sent right now.`,
      });
      onRefresh();
    } catch (error) {
      logAdminError('assign contact lead', error);
      toast({
        title: 'Assignment failed',
        description: toSafeAdminMessage(error, ADMIN_SAVE_FAILED),
        variant: 'destructive',
      });
    } finally {
      setAssigningId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          {isSuperAdmin ? 'Contact Leads' : 'My Assigned Leads'}
        </h2>
        <p className="text-muted-foreground">
          {isSuperAdmin
            ? 'Assign leads to agents and track follow-ups'
            : 'Leads assigned to you — update status as you follow up'}
        </p>
      </div>

      {isSuperAdmin && (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">Unassigned</p>
            <p className="text-lg font-semibold tabular-nums">{agentCounts.unassigned ?? 0}</p>
          </div>
          {agents.map((agent) => (
            <div key={agent.email} className="rounded-lg border bg-card px-4 py-3">
              <p className="truncate text-xs text-muted-foreground">{agent.email}</p>
              <p className="text-lg font-semibold tabular-nums">
                {agentCounts[agent.email] ?? 0}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {CONTACT_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isSuperAdmin && (
          <Select value={agentFilter} onValueChange={setAgentFilter}>
            <SelectTrigger className="w-full sm:w-52">
              <SelectValue placeholder="Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All agents</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {agents.map((agent) => (
                <SelectItem key={agent.email} value={agent.email}>
                  {maskEmail(agent.email)} ({agentCounts[agent.email] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              importLeadsCsv(file);
            }}
          />
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
          >
            <Upload className="mr-2 h-4 w-4" />
            {importing ? 'Importing…' : 'Import CSV'}
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={exportLeadsCsv}
            disabled={filtered.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
            {isSuperAdmin ? 'No contact leads found.' : 'No leads assigned to you yet.'}
          </p>
        ) : (
          filtered.map((contact) => (
            <div key={contact.id} className="rounded-xl border bg-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">
                      {contact.first_name} {contact.last_name}
                    </h3>
                    <Badge variant={statusVariant[contact.status]}>{contact.status}</Badge>
                    {contact.assigned_to ? (
                      <Badge variant="outline" className="gap-1">
                        <UserCheck className="h-3 w-3" />
                        {contact.assigned_to}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Unassigned</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {contact.email} · {contact.phone || 'No phone'}
                  </p>
                  {contact.subject && (
                    <p className="mt-2 text-sm font-medium">Subject: {contact.subject}</p>
                  )}
                  <p className="mt-2 text-sm">{contact.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(contact.created_at).toLocaleString()}
                    {contact.assigned_at
                      ? ` · Assigned ${new Date(contact.assigned_at).toLocaleString()}`
                      : ''}
                  </p>
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-48">
                  {isSuperAdmin && (
                    <Select
                      value={contact.assigned_to ?? 'unassigned'}
                      onValueChange={(value) => {
                        if (value === 'unassigned' || value === contact.assigned_to) return;
                        assignLead(contact.id, value);
                      }}
                      disabled={assigningId === contact.id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Assign to" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned" disabled>
                          Assign to...
                        </SelectItem>
                        {agents.map((agent) => (
                          <SelectItem key={agent.email} value={agent.email}>
                            {agent.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {!isSuperAdmin &&
                    currentUserEmail &&
                    contact.assigned_to?.toLowerCase() === currentUserEmail.toLowerCase() && (
                    <p className="text-xs text-muted-foreground">Assigned to you</p>
                  )}

                  <Select
                    value={contact.status}
                    onValueChange={(v) => updateStatus(contact.id, v as ContactLeadStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTACT_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
