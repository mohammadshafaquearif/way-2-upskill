export function formatAdminDate(value: string): string {
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function enrollmentStatusClass(status: string): string {
  switch (status) {
    case 'active':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'completed':
      return 'border-blue-200 bg-blue-50 text-blue-700';
    case 'pending':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    case 'cancelled':
      return 'border-red-200 bg-red-50 text-red-700';
    default:
      return 'border-border bg-muted text-muted-foreground';
  }
}

export function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function saleSourceClass(source: string): string {
  switch (source) {
    case 'razorpay':
      return 'border-emerald-200 bg-emerald-50 text-emerald-800';
    case 'manual':
      return 'border-slate-200 bg-slate-50 text-slate-700';
    case 'pending':
      return 'border-amber-200 bg-amber-50 text-amber-800';
    case 'cancelled':
      return 'border-red-200 bg-red-50 text-red-700';
    default:
      return 'border-border bg-muted text-muted-foreground';
  }
}
