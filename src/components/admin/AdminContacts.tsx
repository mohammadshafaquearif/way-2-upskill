import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
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
import type { AdminContact, ContactLeadStatus } from '@/lib/adminTypes';

interface AdminContactsProps {
  contacts: AdminContact[];
  onRefresh: () => void;
}

const statusVariant: Record<ContactLeadStatus, 'default' | 'secondary' | 'outline'> = {
  new: 'default',
  contacted: 'secondary',
  converted: 'outline',
};

const AdminContacts = ({ contacts, onRefresh }: AdminContactsProps) => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contacts.filter((c) => {
      const matchesSearch =
        !q ||
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone || '').includes(q);
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  const updateStatus = async (id: string, status: ContactLeadStatus) => {
    try {
      await apiClient.updateAdminContactStatus(id, status);
      toast({ title: 'Lead status updated' });
      onRefresh();
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Leads</h2>
        <p className="text-muted-foreground">Website contact form submissions</p>
      </div>

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
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {CONTACT_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="rounded-lg border bg-card p-8 text-center text-muted-foreground">No contact leads found.</p>
        ) : (
          filtered.map((contact) => (
            <div key={contact.id} className="rounded-xl border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{contact.first_name} {contact.last_name}</h3>
                    <Badge variant={statusVariant[contact.status]}>{contact.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{contact.email} · {contact.phone || 'No phone'}</p>
                  {contact.subject && (
                    <p className="mt-2 text-sm font-medium">Subject: {contact.subject}</p>
                  )}
                  <p className="mt-2 text-sm">{contact.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(contact.created_at).toLocaleString()}
                  </p>
                </div>
                <Select value={contact.status} onValueChange={(v) => updateStatus(contact.id, v as ContactLeadStatus)}>
                  <SelectTrigger className="w-full sm:w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CONTACT_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
