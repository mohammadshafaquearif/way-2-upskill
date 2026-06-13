import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import type { AdminProgram, AdminSession } from '@/lib/adminTypes';

interface AdminSessionsProps {
  sessions: AdminSession[];
  programs: AdminProgram[];
  onRefresh: () => void;
}

const emptyForm = {
  course_id: '',
  title: '',
  meet_link: '',
  session_date: '',
  session_time: '',
  mentor_name: '',
};

const AdminSessions = ({ sessions, programs, onRefresh }: AdminSessionsProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.course_id || !form.title || !form.session_date || !form.session_time) {
      toast({ title: 'Fill required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await apiClient.createAdminSession(form);
      toast({ title: 'Session created' });
      setOpen(false);
      setForm(emptyForm);
      onRefresh();
    } catch (error) {
      toast({
        title: 'Create failed',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this session?')) return;
    try {
      await apiClient.deleteAdminSession(id);
      toast({ title: 'Session deleted' });
      onRefresh();
    } catch (error) {
      toast({ title: 'Delete failed', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Session Management</h2>
          <p className="text-muted-foreground">Schedule live sessions with Zoom/Meet links</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Session
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              {['Program', 'Title', 'Date', 'Time', 'Mentor', 'Link', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3"><Badge variant="secondary">{session.program_code}</Badge></td>
                <td className="px-4 py-3 font-medium">{session.title}</td>
                <td className="px-4 py-3">{new Date(session.session_date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{session.session_time}</td>
                <td className="px-4 py-3">{session.mentor_name || '—'}</td>
                <td className="px-4 py-3">
                  {session.meet_link ? (
                    <a href={session.meet_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                      Join <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : '—'}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(session.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Create Session</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Program</Label>
              <Select value={form.course_id} onValueChange={(v) => setForm({ ...form, course_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                <SelectContent>
                  {programs.filter((p) => p.is_active).map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.code} — {p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Session title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={form.session_date} onChange={(e) => setForm({ ...form, session_date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" value={form.session_time} onChange={(e) => setForm({ ...form, session_time: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mentor name</Label>
              <Input value={form.mentor_name} onChange={(e) => setForm({ ...form, mentor_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Zoom / Meet link</Label>
              <Input value={form.meet_link} onChange={(e) => setForm({ ...form, meet_link: e.target.value })} placeholder="https://meet.google.com/..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSessions;
