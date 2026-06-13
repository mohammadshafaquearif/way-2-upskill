import { createOrder, type VerifyPaymentPayload } from '@/lib/payments';
import { getRazorpayKeyId } from '@/lib/razorpayConfig';

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: RazorpayFailedResponse) => void) => void;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: VerifyPaymentPayload) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayFailedResponse {
  error: {
    description: string;
    reason?: string;
  };
}

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

let scriptPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${CHECKOUT_SCRIPT}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay checkout')));
        return;
      }

      const script = document.createElement('script');
      script.src = CHECKOUT_SCRIPT;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay checkout'));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}

export interface OpenCheckoutParams {
  amountPaise: number;
  receipt: string;
  courseTitle: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  onSuccess: (response: VerifyPaymentPayload) => void;
  onDismiss: () => void;
  onError: (message: string) => void;
}

export async function openRazorpayCheckout({
  amountPaise,
  receipt,
  courseTitle,
  userName,
  userEmail,
  userPhone,
  onSuccess,
  onDismiss,
  onError,
}: OpenCheckoutParams): Promise<void> {
  const keyId = getRazorpayKeyId();
  if (!keyId) {
    throw new Error('Razorpay key is not configured for current mode');
  }

  await loadRazorpayScript();

  const order = await createOrder(amountPaise, receipt);

  if (!window.Razorpay) {
    throw new Error('Razorpay checkout is unavailable');
  }

  const razorpay = new window.Razorpay({
    key: keyId,
    amount: order.amount,
    currency: order.currency,
    name: 'Zyvotrix',
    description: courseTitle,
    order_id: order.order_id,
    prefill: {
      name: userName,
      email: userEmail,
      contact: userPhone,
    },
    theme: { color: '#6366f1' },
    handler: (response) => {
      onSuccess(response);
    },
    modal: {
      ondismiss: onDismiss,
    },
  });

  razorpay.on('payment.failed', (response) => {
    onError(response.error.description || 'Payment failed');
  });

  razorpay.open();
}
