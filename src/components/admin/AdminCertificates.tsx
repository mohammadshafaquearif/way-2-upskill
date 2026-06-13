import React, { useState } from 'react';
import { Plus, Download, Search, CheckCircle2, XCircle } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';
import { downloadCertificatePdf } from '@/lib/certificateUtils';
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
import type { AdminCertificate, AdminLearner, AdminProgram } from '@/lib/adminTypes';

interface AdminCertificatesProps {
  certificates: AdminCertificate[];
  learners: AdminLearner[];
  programs: AdminProgram[];
  onRefresh: () => void;
}

const AdminCertificates = ({ certificates, learners, programs, onRefresh }: AdminCertificatesProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState<Record<string, unknown> | null | 'invalid'>(null);
  const [form, setForm] = useState({
    student_name: '',
    user_id: '',
    course_id: '',
    program_code: '',
    completion_date: new Date().toISOString().slice(0, 10),
  });
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    if (!form.student_name || !form.completion_date) {
      toast({ title: 'Student name and date required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const program = programs.find((p) => p.id === form.course_id);
      await apiClient.createAdminCertificate({
        student_name: form.student_name,
        user_id: form.user_id || undefined,
        course_id: form.course_id || undefined,
        program_code: program?.code || form.program_code,
        completion_date: form.completion_date,
      });
      toast({ title: 'Certificate generated' });
      setOpen(false);
      onRefresh();
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleVerify = async () => {
    if (!verifyId.trim()) return;
    try {
      const result = await apiClient.verifyAdminCertificate(verifyId.trim());
      setVerifyResult(result || 'invalid');
    } catch {
      setVerifyResult('invalid');
    }
  };

  const programTitle = (cert: AdminCertificate) =>
    programs.find((p) => p.id === cert.course_id || p.code === cert.program_code)?.title ||
    cert.program_code ||
    'Program';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Certificate Management</h2>
          <p className="text-muted-foreground">Generate, download, and verify certificates</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Generate Certificate
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 font-semibold">Verify Certificate</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Enter Certificate ID (e.g. ZYX-2026-ABC123)"
            value={verifyId}
            onChange={(e) => setVerifyId(e.target.value)}
          />
          <Button onClick={handleVerify} className="gap-2 shrink-0">
            <Search className="h-4 w-4" /> Verify
          </Button>
        </div>
        {verifyResult && verifyResult !== 'invalid' && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Valid certificate</p>
              <p>{String(verifyResult.student_name)} — {String(verifyResult.program_code)}</p>
              <p className="text-green-700">Completed: {String(verifyResult.completion_date)}</p>
            </div>
          </div>
        )}
        {verifyResult === 'invalid' && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <XCircle className="h-5 w-5" /> Certificate not found
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              {['Student', 'Certificate ID', 'Program', 'Completion', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{cert.student_name}</td>
                <td className="px-4 py-3 font-mono text-xs">{cert.certificate_id}</td>
                <td className="px-4 py-3"><Badge>{cert.program_code}</Badge></td>
                <td className="px-4 py-3">{new Date(cert.completion_date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => downloadCertificatePdf(cert, programTitle(cert))}
                  >
                    <Download className="h-4 w-4" /> PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Generate Certificate</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Learner (optional)</Label>
              <Select
                value={form.user_id}
                onValueChange={(userId) => {
                  const learner = learners.find((l) => l.id === userId);
                  setForm({
                    ...form,
                    user_id: userId,
                    student_name: learner ? `${learner.first_name} ${learner.last_name}` : form.student_name,
                  });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Select learner" /></SelectTrigger>
                <SelectContent>
                  {learners.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.first_name} {l.last_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Student name</Label>
              <Input value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Program</Label>
              <Select
                value={form.course_id}
                onValueChange={(courseId) => {
                  const program = programs.find((p) => p.id === courseId);
                  setForm({ ...form, course_id: courseId, program_code: program?.code || '' });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                <SelectContent>
                  {programs.filter((p) => p.is_active).map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Completion date</Label>
              <Input type="date" value={form.completion_date} onChange={(e) => setForm({ ...form, completion_date: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleGenerate} disabled={saving}>{saving ? 'Generating...' : 'Generate'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertificates;
