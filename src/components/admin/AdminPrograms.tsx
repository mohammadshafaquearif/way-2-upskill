import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
import type { AdminProgram } from '@/lib/adminTypes';

interface AdminProgramsProps {
  programs: AdminProgram[];
  onRefresh: () => void;
}

const emptyForm = {
  code: '',
  title: '',
  description: '',
  duration: '',
  price: '',
  curriculum: '',
  category: '',
  level: '',
};

const AdminPrograms = ({ programs, onRefresh }: AdminProgramsProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProgram | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (program: AdminProgram) => {
    setEditing(program);
    setForm({
      code: program.code,
      title: program.title,
      description: program.description || '',
      duration: program.duration || '',
      price: String(program.price),
      curriculum: program.curriculum || '',
      category: program.category || '',
      level: program.level || '',
    });
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        code: form.code.toUpperCase(),
        title: form.title,
        description: form.description,
        duration: form.duration,
        price: Number(form.price) || 0,
        curriculum: form.curriculum,
        category: form.category,
        level: form.level,
      };

      if (editing) {
        await apiClient.updateAdminProgram(editing.id, payload);
        toast({ title: 'Program updated' });
      } else {
        await apiClient.createAdminProgram(payload);
        toast({ title: 'Program created' });
      }
      setOpen(false);
      onRefresh();
    } catch (error) {
      toast({
        title: 'Save failed',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (program: AdminProgram) => {
    if (!confirm(`Deactivate ${program.code}?`)) return;
    try {
      await apiClient.deleteAdminProgram(program.id);
      toast({ title: 'Program deactivated' });
      onRefresh();
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    }
  };

  const activePrograms = programs.filter((p) => p.is_active);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Program Management</h2>
          <p className="text-muted-foreground">Manage DOP, AAC, AWS, DSP and other programs</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Create Program
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {activePrograms.map((program) => (
          <div key={program.id} className="rounded-xl border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge className="mb-2">{program.code}</Badge>
                <h3 className="font-semibold">{program.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{program.description}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => openEdit(program)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(program)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-muted-foreground">Duration:</span> {program.duration}</div>
              <div><span className="text-muted-foreground">Price:</span> ${program.price}</div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
              <strong>Curriculum:</strong> {program.curriculum || 'Not set'}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Program' : 'Create Program'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Code</Label>
                <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="DOP" />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="4 Months" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <Input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Curriculum</Label>
              <Textarea rows={3} value={form.curriculum} onChange={(e) => setForm({ ...form, curriculum: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPrograms;
