import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AdminSaleRecord } from '@/lib/adminTypes';
import { COURSES } from '@/lib/courses';
import {
  filterSales,
  formatSaleAmounts,
  saleSourceLabel,
  summarizeSales,
  type SaleFilter,
} from '@/lib/salesReport';
import { capitalizeStatus, enrollmentStatusClass, formatAdminDate, saleSourceClass } from '@/lib/adminUi';
import { formatInrAmount } from '@/lib/coursePricing';

interface AdminSalesReportProps {
  sales: AdminSaleRecord[];
}

const FILTER_OPTIONS: { value: SaleFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'razorpay', label: 'Razorpay' },
  { value: 'pending', label: 'Pending' },
  { value: 'manual', label: 'Admin' },
  { value: 'cancelled', label: 'Cancelled' },
];

const SummaryCell = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="border-r border-border px-4 py-3 last:border-r-0">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
    {sub ? <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p> : null}
  </div>
);

const AdminSalesReport = ({ sales }: AdminSalesReportProps) => {
  const [filter, setFilter] = useState<SaleFilter>('all');
  const [search, setSearch] = useState('');
  const [program, setProgram] = useState('all');
  const [linkCourse, setLinkCourse] = useState(COURSES[0]?.id ?? 'dop');
  const [linkName, setLinkName] = useState('');
  const [linkEmail, setLinkEmail] = useState('');
  const [linkPhone, setLinkPhone] = useState('');
  const [generatedLink, setGeneratedLink] = useState<string>('');

  const programOptions = useMemo(() => {
    const codes = new Set<string>();
    sales.forEach((s) => {
      if (s.program_code) codes.add(s.program_code);
    });
    return Array.from(codes).sort();
  }, [sales]);

  const summary = useMemo(() => summarizeSales(sales), [sales]);

  const rows = useMemo(
    () => filterSales(sales, filter, search, program),
    [sales, filter, search, program],
  );

  const buildPaymentLink = () => {
    const course = COURSES.find((c) => c.id === linkCourse) ?? COURSES[0];
    if (!course) return '';
    const origin = window.location.origin;
    const url = new URL(course.checkoutPath, origin);
    if (linkEmail.trim()) url.searchParams.set('email', linkEmail.trim());
    if (linkPhone.trim()) url.searchParams.set('phone', linkPhone.trim());
    if (linkName.trim()) url.searchParams.set('name', linkName.trim());
    url.searchParams.set('autoPay', '1');
    return url.toString();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold">Generate payment link (share with learner)</p>
            <p className="text-xs text-muted-foreground">
              Opens checkout with details prefilled and triggers Razorpay automatically.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Program</Label>
              <Select value={linkCourse} onValueChange={setLinkCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  {COURSES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.shortTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Learner name</Label>
              <Input value={linkName} onChange={(e) => setLinkName(e.target.value)} placeholder="Full name" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input value={linkEmail} onChange={(e) => setLinkEmail(e.target.value)} placeholder="name@email.com" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Phone</Label>
              <Input value={linkPhone} onChange={(e) => setLinkPhone(e.target.value)} placeholder="+91 9876543210" />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              onClick={() => {
                const link = buildPaymentLink();
                setGeneratedLink(link);
                if (link) void navigator.clipboard?.writeText(link);
              }}
            >
              Generate & Copy Link
            </Button>

            <div className="min-w-0 flex-1">
              <Input
                value={generatedLink}
                readOnly
                placeholder="Generated link will appear here…"
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-y divide-border rounded-lg border bg-card sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        <SummaryCell label="Total entries" value={String(summary.total)} />
        <SummaryCell
          label="Razorpay received"
          value={String(summary.razorpayCount)}
          sub={formatInrAmount(summary.razorpayRevenue)}
        />
        <SummaryCell label="Payment pending" value={String(summary.pendingCount)} />
        <SummaryCell
          label="Admin access"
          value={String(summary.manualCount)}
          sub={summary.cancelledCount > 0 ? `${summary.cancelledCount} cancelled` : undefined}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={program} onValueChange={setProgram}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All programs</SelectItem>
              {programOptions.map((code) => (
                <SelectItem key={code} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, email, payment ID..."
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Learner</TableHead>
              <TableHead>Program</TableHead>
              <TableHead className="text-right">Paid</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Enrollment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No records match your filters.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((record) => {
                const amounts = formatSaleAmounts(record);
                return (
                <TableRow key={record.id}>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatAdminDate(record.created_at)}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{record.user_name || '—'}</p>
                    <p className="text-xs text-muted-foreground">{record.user_email || '—'}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{record.program_code || '—'}</p>
                    <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                      {record.course_name}
                    </p>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <p className="font-medium">{amounts.paid}</p>
                    {amounts.due ? (
                      <p className="text-xs text-muted-foreground">{amounts.due}</p>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={saleSourceClass(record.payment_source)}>
                      {saleSourceLabel(record.payment_source)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[160px]">
                    {record.razorpay_payment_id ? (
                      <span
                        className="block truncate font-mono text-xs"
                        title={record.razorpay_payment_id}
                      >
                        {record.razorpay_payment_id}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-normal ${enrollmentStatusClass(record.status)}`}
                    >
                      {capitalizeStatus(record.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
              })
            )}
          </TableBody>
        </Table>

        <div className="border-t px-4 py-2 text-xs text-muted-foreground">
          Showing {rows.length} of {sales.length} entries
        </div>
      </div>
    </div>
  );
};

export default AdminSalesReport;
