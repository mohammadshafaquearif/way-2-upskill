import React, { useMemo, useState } from 'react';
import { Pencil, Plus, Shield, Trash2, UserCog } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_TAB_PERMISSIONS } from '@/lib/admin';
import { ADMIN_SAVE_FAILED, logAdminError, toSafeAdminMessage } from '@/lib/adminErrors';
import { ADMIN_SECTIONS } from '@/lib/adminConstants';
import type { AdminAccessRecord, AdminPermission } from '@/lib/adminTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PERMISSION_LABELS: Record<AdminPermission, string> = Object.fromEntries(
  ADMIN_SECTIONS.filter((s) => s.id !== 'admin_access').map((s) => [s.id, s.label]),
) as Record<AdminPermission, string>;

interface AdminAccessProps {
  records: AdminAccessRecord[];
  onRefresh: () => void;
}

const emptyForm = {
  email: '',
  permissions: [] as AdminPermission[],
  is_active: true,
  notes: '',
};

const AdminAccess = ({ records, onRefresh }: AdminAccessProps) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminAccessRecord | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const sortedRecords = useMemo(
    () => [...records].sort((a, b) => a.email.localeCompare(b.email)),
    [records],
  );

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (record: AdminAccessRecord) => {
    setEditing(record);
    setForm({
      email: record.email,
      permissions: [...record.permissions],
      is_active: record.is_active,
      notes: record.notes ?? '',
    });
    setDialogOpen(true);
  };

  const togglePermission = (permission: AdminPermission, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      permissions: checked
        ? [...new Set([...prev.permissions, permission])]
        : prev.permissions.filter((p) => p !== permission),
    }));
  };

  const handleSave = async () => {
    const email = form.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: 'Invalid email', variant: 'destructive' });
      return;
    }
    if (email === 'admin@zyvotrix.com') {
      toast({
        title: 'Super admin is fixed',
        description: 'admin@zyvotrix.com always has full access and cannot be edited here.',
        variant: 'destructive',
      });
      return;
    }
    if (form.permissions.length === 0) {
      toast({
        title: 'Select at least one tab',
        description: 'Choose which admin sections this user can access.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      await apiClient.upsertAdminAccess({
        id: editing?.id,
        email,
        permissions: form.permissions,
        is_active: form.is_active,
        notes: form.notes.trim() || null,
      });
      toast({ title: editing ? 'Admin updated' : 'Admin access granted' });
      setDialogOpen(false);
      onRefresh();
    } catch (err) {
      logAdminError('save admin access', err);
      toast({
        title: 'Save failed',
        description: toSafeAdminMessage(err, ADMIN_SAVE_FAILED),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record: AdminAccessRecord) => {
    if (!window.confirm(`Remove admin access for ${record.email}?`)) return;
    try {
      await apiClient.deleteAdminAccess(record.id);
      toast({ title: 'Admin access removed' });
      onRefresh();
    } catch (err) {
      logAdminError('delete admin access', err);
      toast({
        title: 'Delete failed',
        description: toSafeAdminMessage(err, ADMIN_SAVE_FAILED),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Delegated admin access</h2>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Grant tab-level permissions to team members. <strong>admin@zyvotrix.com</strong> always
            has full access. Users must already have a login account before you add them here.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add admin
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Tabs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">admin@zyvotrix.com</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {ADMIN_TAB_PERMISSIONS.map((p) => (
                    <Badge key={p} variant="secondary" className="text-xs">
                      {PERMISSION_LABELS[p]}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge>Super admin</Badge>
              </TableCell>
              <TableCell />
            </TableRow>
            {sortedRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {record.permissions.length === 0 ? (
                      <span className="text-sm text-muted-foreground">No tabs</span>
                    ) : (
                      record.permissions.map((p) => (
                        <Badge key={p} variant="outline" className="text-xs">
                          {PERMISSION_LABELS[p]}
                        </Badge>
                      ))
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={record.is_active ? 'default' : 'secondary'}>
                    {record.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(record)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(record)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sortedRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  <UserCog className="mx-auto mb-2 h-8 w-8 opacity-50" />
                  No delegated admins yet. Add team members and choose which tabs they can use.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit admin access' : 'Grant admin access'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="admin-access-email">Email</Label>
              <Input
                id="admin-access-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="team@example.com"
                disabled={Boolean(editing)}
              />
            </div>

            <div className="space-y-3">
              <Label>Allowed tabs</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {ADMIN_TAB_PERMISSIONS.map((permission) => (
                  <label
                    key={permission}
                    className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={form.permissions.includes(permission)}
                      onCheckedChange={(checked) =>
                        togglePermission(permission, checked === true)
                      }
                    />
                    <span className="text-sm font-medium">{PERMISSION_LABELS[permission]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-xs text-muted-foreground">Inactive users cannot sign in to admin</p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={(checked) => setForm((f) => ({ ...f, is_active: checked }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-access-notes">Notes (optional)</Label>
              <Textarea
                id="admin-access-notes"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="e.g. Handles learner support only"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Update' : 'Grant access'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAccess;
