import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResourceEmailCaptureProps {
  resourceName: string;
  variant?: 'inline' | 'card';
  buttonLabel?: string;
  className?: string;
}

const ResourceEmailCapture = ({
  resourceName,
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
    if (!email.trim() || !email.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
    toast({
      title: 'Download ready!',
      description: `We sent ${resourceName} access details to your inbox.`,
    });
    setEmail('');
  };

  if (submitted && variant === 'inline') {
    return (
      <p className={`text-sm font-medium text-primary ${className}`}>
        Check your email for the download link.
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
          {loading ? 'Sending...' : buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default ResourceEmailCapture;
