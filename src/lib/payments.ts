export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  verified: boolean;
  message?: string;
  error?: string;
  order_id?: string;
  payment_id?: string;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.details || 'Payment request failed');
  }
  return data as T;
}

export async function createOrder(amount: number, receipt: string): Promise<CreateOrderResponse> {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency: 'INR', receipt }),
  });

  return parseJsonResponse<CreateOrderResponse>(response);
}

export async function verifyPayment(payload: VerifyPaymentPayload): Promise<VerifyPaymentResponse> {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse<VerifyPaymentResponse>(response);
}

/** Convert rupee amount to paise for Razorpay */
export function rupeesToPaise(rupees: number): number {
  return Math.max(100, Math.round(rupees * 100));
}

export function formatInr(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100);
}
