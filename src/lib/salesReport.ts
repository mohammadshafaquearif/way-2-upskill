import {
  hasRazorpayPayment,
  isAdminGrantedPayment,
  isEnrollmentCancelled,
  isPaymentCompleted,
} from '@/lib/enrollmentAccess';
import type { AdminSaleRecord, SalePaymentSource } from '@/lib/adminTypes';
import { enrollmentPaidAmountInInr, formatCoursePrice, inferPaymentCurrency } from '@/lib/coursePricing';

export type SaleFilter = 'all' | SalePaymentSource;

export function classifySalePaymentSource(enrollment: {
  status?: string | null;
  payment_status?: string | null;
  razorpay_payment_id?: string | null;
}): SalePaymentSource {
  if (isEnrollmentCancelled(enrollment.status)) return 'cancelled';
  if (hasRazorpayPayment(enrollment)) return 'razorpay';
  if (isAdminGrantedPayment(enrollment.payment_status)) return 'manual';
  if (isPaymentCompleted(enrollment.payment_status)) return 'razorpay';
  return 'pending';
}

export function saleSourceLabel(source: SalePaymentSource): string {
  switch (source) {
    case 'razorpay':
      return 'Razorpay';
    case 'manual':
      return 'Admin';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
  }
}

/** Amount actually received (never falls back to catalog/list price). */
export function saleRowPaidAmount(record: AdminSaleRecord): number {
  return Number(record.paid_amount) || 0;
}

/** Legacy courses.price seed values — not real checkout totals. */
const LEGACY_CATALOG_AMOUNT_MAX = 500;

function isLegacyCatalogAmount(amount: number | null | undefined): boolean {
  return amount != null && amount > 0 && amount <= LEGACY_CATALOG_AMOUNT_MAX;
}

/** Outstanding amount from enrollment record only (null when not applicable). */
export function saleRowDueAmount(record: AdminSaleRecord): number | null {
  if (record.payment_source === 'manual' || record.payment_source === 'cancelled') return null;

  const paid = saleRowPaidAmount(record);
  const total =
    record.total_amount != null && record.total_amount > 0 && !isLegacyCatalogAmount(record.total_amount)
      ? record.total_amount
      : null;

  if (total != null && total > paid) return total;
  return null;
}

export interface SaleAmountDisplay {
  paid: string;
  due: string | null;
}

export function formatSaleAmounts(record: AdminSaleRecord): SaleAmountDisplay {
  const currency = inferPaymentCurrency(record.country, record.payment_currency);
  const paid = saleRowPaidAmount(record);
  const due = saleRowDueAmount(record);

  if (record.payment_source === 'manual') {
    return { paid: '—', due: 'No payment' };
  }

  if (paid > 0) {
    return { paid: formatCoursePrice(paid, currency), due: null };
  }

  // Razorpay marked but paid_amount missing — use stored checkout total if present
  if (
    record.payment_source === 'razorpay' &&
    record.total_amount != null &&
    record.total_amount > 0 &&
    !isLegacyCatalogAmount(record.total_amount)
  ) {
    return { paid: formatCoursePrice(record.total_amount, currency), due: null };
  }

  if (due != null) {
    return { paid: '—', due: `Due ${formatCoursePrice(due, currency)}` };
  }

  return { paid: '—', due: null };
}

export function summarizeSales(records: AdminSaleRecord[]) {
  const razorpay = records.filter((r) => r.payment_source === 'razorpay');
  const pending = records.filter((r) => r.payment_source === 'pending');
  const manual = records.filter((r) => r.payment_source === 'manual');
  const cancelled = records.filter((r) => r.payment_source === 'cancelled');

  const razorpayRevenue = razorpay.reduce((sum, r) => {
    const paid = saleRowPaidAmount(r);
    if (paid > 0) return sum + enrollmentPaidAmountInInr({ ...r, paid_amount: paid });
    if (r.total_amount != null && r.total_amount > 0) {
      return sum + enrollmentPaidAmountInInr({ ...r, paid_amount: r.total_amount });
    }
    return sum;
  }, 0);

  return {
    total: records.length,
    razorpayCount: razorpay.length,
    pendingCount: pending.length,
    manualCount: manual.length,
    cancelledCount: cancelled.length,
    razorpayRevenue,
  };
}

export function filterSales(
  records: AdminSaleRecord[],
  filter: SaleFilter,
  search: string,
  programCode: string,
): AdminSaleRecord[] {
  const q = search.trim().toLowerCase();

  return records.filter((record) => {
    if (filter !== 'all' && record.payment_source !== filter) return false;
    if (programCode !== 'all' && (record.program_code ?? '') !== programCode) return false;
    if (!q) return true;

    return (
      record.user_name.toLowerCase().includes(q) ||
      record.user_email.toLowerCase().includes(q) ||
      (record.razorpay_payment_id ?? '').toLowerCase().includes(q) ||
      (record.razorpay_order_id ?? '').toLowerCase().includes(q) ||
      record.course_name.toLowerCase().includes(q)
    );
  });
}
