import React, { useMemo, useState } from 'react';
import { Search, Pencil } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ENROLLMENT_STATUS_OPTIONS, LEARNER_STATUSES } from '@/lib/adminConstants';
import { capitalizeStatus, enrollmentStatusClass } from '@/lib/adminUi';
import type { AdminLearner, AdminProgram } from '@/lib/adminTypes';

interface AdminLearnersProps {
  learners: AdminLearner[];
  programs: AdminProgram[];
  onRefresh: () => void;
}

const AdminLearners = ({ learners, programs, onRefresh }: AdminLearnersProps) => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<AdminLearner | null>(null);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    country: '',
    assigned_program: '',
    learner_status: 'active',
    admin_notes: '',
    enrollment_status: 'active',
    course_id: '',
  });
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return learners;
    return learners.filter(
      (l) =>
        `${l.first_name} ${l.last_name}`.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q),
    );
  }, [learners, search]);

  const openEdit = (learner: AdminLearner) => {
    const program = programs.find(
      (p) =>
        p.id === learner.enrollment_course_id ||
        p.code === learner.assigned_program,
    );
    setEditing(learner);
    setForm({
      first_name: learner.first_name,
      last_name: learner.last_name,
      phone: learner.phone,
      country: learner.country || '',
      assigned_program: learner.assigned_program || program?.code || '',
      learner_status: learner.learner_status,
      admin_notes: learner.admin_notes || '',
      enrollment_status: learner.enrollment_status || 'active',
      course_id: learner.enrollment_course_id || program?.id || '',
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await apiClient.updateAdminLearner(editing.id, {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        country: form.country,
        assigned_program: form.assigned_program,
        learner_status: form.learner_status as AdminLearner['learner_status'],
        admin_notes: form.admin_notes,
      });

      if (form.course_id || editing.enrollment_course_id) {
        await apiClient.assignProgramToLearner(
          editing.id,
          form.course_id || editing.enrollment_course_id!,
          form.enrollment_status,
        );
      }

      toast({ title: 'Learner updated' });
      setEditing(null);
      onRefresh();
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Learner Management</h2>
          <p className="text-muted-foreground">View, search, edit, and assign programs</p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search learners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              {['Name', 'Email', 'Phone', 'Country', 'Program', 'Joining Date', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((learner) => (
              <tr key={learner.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{learner.first_name} {learner.last_name}</td>
                <td className="px-4 py-3 text-muted-foreground">{learner.email}</td>
                <td className="px-4 py-3">{learner.phone}</td>
                <td className="px-4 py-3">{learner.country || '—'}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{learner.assigned_program || 'Unassigned'}</Badge>
                </td>
                <td className="px-4 py-3">
                  {learner.joining_date
                    ? new Date(learner.joining_date).toLocaleDateString()
                    : new Date(learner.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={enrollmentStatusClass(learner.enrollment_status || learner.learner_status || 'pending')}
                  >
                    {capitalizeStatus(learner.enrollment_status || learner.learner_status || 'pending')}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(learner)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Learner</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Assign program</Label>
              <Select
                value={form.course_id}
                onValueChange={(courseId) => {
                  const program = programs.find((p) => p.id === courseId);
                  setForm({
                    ...form,
                    course_id: courseId,
                    assigned_program: program?.code || '',
                  });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                <SelectContent>
                  {programs.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.code} — {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Learner status</Label>
                <Select value={form.learner_status} onValueChange={(v) => setForm({ ...form, learner_status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LEARNER_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Enrollment status</Label>
                <Select value={form.enrollment_status} onValueChange={(v) => setForm({ ...form, enrollment_status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ENROLLMENT_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {ENROLLMENT_STATUS_OPTIONS.find((o) => o.value === form.enrollment_status)?.description}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                rows={3}
                value={form.admin_notes}
                onChange={(e) => setForm({ ...form, admin_notes: e.target.value })}
                placeholder="Internal admin notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLearners;
