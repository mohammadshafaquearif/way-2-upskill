import React, { useMemo, useState } from 'react';
import { Search, UserCheck } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

  const agentCounts = useMemo(() => countLeadsByAgent(contacts), [contacts]);

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
                  {agent.email} ({agentCounts[agent.email] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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
