import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import { trackEvent } from '@/lib/analytics';

interface ResourceEmailCaptureProps {
  resourceName: string;
  pdfPath: string;
  source?: string;
  variant?: 'inline' | 'card';
  buttonLabel?: string;
  className?: string;
}

function triggerPdfDownload(pdfPath: string) {
  const filename = pdfPath.split('/').pop() || 'zyvotrix-resource.pdf';
  const link = document.createElement('a');
  link.href = pdfPath;
  link.download = filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const ResourceEmailCapture = ({
  resourceName,
  pdfPath,
  source = 'Resources page',
  variant = 'inline',
  buttonLabel = 'Download PDF',
  className = '',
}: ResourceEmailCaptureProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }

    if (!pdfPath) {
      toast({
        title: 'Download unavailable',
        description: 'Please contact support@zyvotrix.com for this resource.',
        variant: 'destructive',
      });
      return;
    }

    const emailLocal = trimmedEmail.split('@')[0] || 'Learner';

    setLoading(true);
    try {
      await apiClient.createContact(
        {
          firstName: emailLocal,
          lastName: '—',
          email: trimmedEmail,
          subject: `${resourceName} — PDF Download`,
          message: [
            `Resource: ${resourceName}`,
            'Action: Downloaded learning roadmap PDF',
            `Source: ${source}`,
          ].join('\n'),
        },
        { emailType: 'inquiry' },
      );

      trackEvent('resource_pdf_download', {
        resource: resourceName,
        source,
      });

      triggerPdfDownload(pdfPath);

      setSubmitted(true);
      toast({
        title: 'Download started',
        description: 'Your PDF is downloading.',
      });
      setEmail('');
    } catch (error) {
      const description =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      toast({ title: 'Download failed', description, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted && variant === 'inline') {
    return (
      <p className={`text-sm font-medium text-primary ${className}`}>
        Your PDF download has started.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`resource-email-capture resource-email-capture--${variant} ${className}`}
    >
      <div className="resource-email-capture-fields">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 pl-9"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="btn-brand h-10 shrink-0 gap-2 px-4">
          <Download className="h-4 w-4" />
          {loading ? 'Preparing...' : buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default ResourceEmailCapture;
