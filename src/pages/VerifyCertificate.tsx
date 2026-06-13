import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle2, XCircle, Award } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '@/hooks/usePageMeta';

const VerifyCertificate = () => {
  usePageMeta({
    title: 'Verify Certificate',
    description: 'Verify Zyvotrix program certificates by certificate ID.',
    canonical: '/verify-certificate',
  });

  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null | 'invalid'>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await apiClient.verifyAdminCertificate(certificateId.trim());
      setResult(data || 'invalid');
    } catch {
      setResult('invalid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <section className="section-padding pt-28 md:pt-32">
        <div className="container max-w-xl px-4">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Award className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Verify Certificate</h1>
            <p className="mt-2 text-muted-foreground">
              Enter a certificate ID to confirm its authenticity.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certificate ID</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  placeholder="ZYX-2026-XXXXXX"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  required
                />
                <Button type="submit" disabled={loading} className="gap-2 shrink-0">
                  <Search className="h-4 w-4" />
                  {loading ? 'Checking...' : 'Verify'}
                </Button>
              </form>

              {result && result !== 'invalid' && (
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-800">Valid certificate</p>
                    <p className="mt-1"><strong>Student:</strong> {String(result.student_name)}</p>
                    <p><strong>Program:</strong> {String(result.program_code)}</p>
                    <p><strong>Completed:</strong> {String(result.completion_date)}</p>
                    <p className="mt-1 font-mono text-xs text-green-700">{String(result.certificate_id)}</p>
                  </div>
                </div>
              )}

              {result === 'invalid' && (
                <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <XCircle className="h-5 w-5" /> No certificate found with this ID.
                </div>
              )}
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">Back to home</Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default VerifyCertificate;
