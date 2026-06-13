import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { SUBMISSION_STATUSES } from '@/lib/adminConstants';
import type { AdminAssignment, AdminProgram, AdminSubmission, SubmissionStatus } from '@/lib/adminTypes';

interface AdminAssignmentsProps {
  assignments: AdminAssignment[];
  submissions: AdminSubmission[];
  programs: AdminProgram[];
  onRefresh: () => void;
}

const emptyForm = {
  course_id: '',
  title: '',
  description: '',
  file_url: '',
  file_name: '',
  due_date: '',
};

const AdminAssignments = ({ assignments, submissions, programs, onRefresh }: AdminAssignmentsProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        file_name: file.name,
        file_url: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.course_id || !form.title || !form.due_date) {
      toast({ title: 'Fill required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await apiClient.createAdminAssignment(form);
      toast({ title: 'Assignment uploaded' });
      setOpen(false);
      setForm(emptyForm);
      onRefresh();
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete assignment?')) return;
    try {
      await apiClient.deleteAdminAssignment(id);
      toast({ title: 'Assignment deleted' });
      onRefresh();
    } catch {
      toast({ title: 'Delete failed', variant: 'destructive' });
    }
  };

  const updateSubmission = async (id: string, status: SubmissionStatus) => {
    try {
      await apiClient.updateAdminSubmissionStatus(id, status);
      toast({ title: 'Submission updated' });
      onRefresh();
    } catch {
      toast({ title: 'Update failed', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assignment Management</h2>
          <p className="text-muted-foreground">Upload assignments, set due dates, track submissions</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Upload className="h-4 w-4" /> Upload Assignment
        </Button>
      </div>

      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="submissions">Submissions ({submissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="mt-4">
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  {['Program', 'Title', 'Due Date', 'Submissions', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assignments.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3"><Badge variant="secondary">{a.program_code}</Badge></td>
                    <td className="px-4 py-3 font-medium">{a.title}</td>
                    <td className="px-4 py-3">{new Date(a.due_date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{a.submission_count ?? 0}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="mt-4">
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  {['Assignment', 'Learner', 'Submitted', 'Status', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No submissions yet</td></tr>
                ) : (
                  submissions.map((s) => (
                    <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">{s.assignment_title}</td>
                      <td className="px-4 py-3">
                        <div>{s.learner_name || '—'}</div>
                        <div className="text-xs text-muted-foreground">{s.learner_email}</div>
                      </td>
                      <td className="px-4 py-3">{new Date(s.submitted_at).toLocaleString()}</td>
                      <td className="px-4 py-3"><Badge>{s.status}</Badge></td>
                      <td className="px-4 py-3">
                        <Select value={s.status} onValueChange={(v) => updateSubmission(s.id, v as SubmissionStatus)}>
                          <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {SUBMISSION_STATUSES.map((st) => (
                              <SelectItem key={st} value={st}>{st}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Upload Assignment</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Program</Label>
              <Select value={form.course_id} onValueChange={(v) => setForm({ ...form, course_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                <SelectContent>
                  {programs.filter((p) => p.is_active).map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Due date</Label>
              <Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>File (optional)</Label>
              <Input type="file" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
              {form.file_name && <p className="text-xs text-muted-foreground">{form.file_name}</p>}
            </div>
            <div className="space-y-2">
              <Label>Or document URL</Label>
              <Input value={form.file_url.startsWith('data:') ? '' : form.file_url} onChange={(e) => setForm({ ...form, file_url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Uploading...' : 'Upload'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAssignments;
