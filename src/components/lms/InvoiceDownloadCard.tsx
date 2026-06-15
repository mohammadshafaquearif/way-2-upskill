import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { downloadEnrollmentInvoice } from '@/lib/downloadInvoice';
import { FileText, Download, Loader2 } from 'lucide-react';

export interface LearnerInvoiceEnrollment {
  id: string;
  course_name: string;
  enrollment_date?: string;
  status: string;
  enrollment_number?: string | null;
  total_amount?: number | null;
  paid_amount?: number | null;
  payment_status?: string | null;
  razorpay_payment_id?: string | null;
  country?: string | null;
}

function formatAmount(amount: number | null | undefined, country?: string | null) {
  const value = Number(amount) || 0;
  const currency = !country || country.toLowerCase().includes('india') ? 'INR' : 'USD';
  try {
    return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'INR' ? 0 : 2,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

function canDownloadInvoice(enrollment: LearnerInvoiceEnrollment) {
  return (
    enrollment.payment_status === 'completed' ||
    Boolean(enrollment.razorpay_payment_id) ||
    Number(enrollment.paid_amount) > 0
  );
}

const InvoiceDownloadCard = ({ enrollments }: { enrollments: LearnerInvoiceEnrollment[] }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const invoiceable = enrollments.filter(canDownloadInvoice);

  if (!invoiceable.length) return null;

  const handleDownload = async (enrollmentId: string) => {
    setDownloadingId(enrollmentId);
    try {
      await downloadEnrollmentInvoice(enrollmentId);
      toast({
        title: 'Invoice downloaded',
        description: 'Your PDF invoice has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Invoices &amp; Payments
        </CardTitle>
        <CardDescription>
          Download PDF invoices for your completed enrollments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {invoiceable.map((enrollment) => (
          <div
            key={enrollment.id}
            className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 space-y-1">
              <p className="font-semibold truncate">{enrollment.course_name}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {enrollment.enrollment_number && (
                  <span className="font-mono">{enrollment.enrollment_number}</span>
                )}
                {enrollment.enrollment_date && (
                  <span>
                    {format(new Date(enrollment.enrollment_date), 'dd MMM yyyy')}
                  </span>
                )}
                <Badge variant="secondary" className="text-[10px]">
                  {enrollment.payment_status === 'completed' ? 'Paid' : 'Payment recorded'}
                </Badge>
              </div>
              <p className="text-sm font-medium text-green-700">
                {formatAmount(enrollment.paid_amount ?? enrollment.total_amount, enrollment.country)}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              disabled={downloadingId === enrollment.id}
              onClick={() => handleDownload(enrollment.id)}
            >
              {downloadingId === enrollment.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing…
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </>
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default InvoiceDownloadCard;
