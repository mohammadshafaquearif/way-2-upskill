import Razorpay from 'razorpay';
import crypto from 'crypto';
import { getRazorpayCredentials } from './razorpayConfig.mjs';

function getRazorpayConfig() {
  const { mode, key_id, key_secret } = getRazorpayCredentials();

  if (!key_id || !key_secret) {
    return {
      error: {
        status: 500,
        body: {
          error: `Razorpay ${mode} credentials are not configured`,
        },
      },
    };
  }

  return {
    mode,
    key_id,
    key_secret,
    instance: new Razorpay({ key_id, key_secret }),
  };
}

const RAZORPAY_CURRENCIES = new Set([
  'INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD', 'AUD', 'CAD', 'SAR', 'MYR',
]);

export async function handleCreateOrderRequest(body = {}) {
  const amount = Number(body.amount);
  const currency = String(body.currency || 'INR').toUpperCase();
  const receipt = body.receipt || `rcpt_${Date.now()}`;

  if (!Number.isFinite(amount) || amount < 100) {
    return {
      status: 400,
      body: { error: `Amount must be at least 100 minor units (e.g. ₹1 or $1) for ${currency}` },
    };
  }

  if (!RAZORPAY_CURRENCIES.has(currency)) {
    return {
      status: 400,
      body: { error: `Currency ${currency} is not supported. Use one of: ${[...RAZORPAY_CURRENCIES].join(', ')}` },
    };
  }

  const config = getRazorpayConfig();
  if (config.error) return config.error;

  try {
    const order = await config.instance.orders.create({
      amount: Math.round(amount),
      currency,
      receipt,
    });

    return {
      status: 200,
      body: {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: config.key_id,
        mode: config.mode,
      },
    };
  } catch (error) {
    const statusCode = error?.statusCode ?? error?.status;

    if (statusCode === 401) {
      return {
        status: 401,
        body: { error: 'Razorpay authentication failed. Check API keys.' },
      };
    }

    return {
      status: 500,
      body: {
        error: 'Failed to create Razorpay order',
        details: error?.error?.description || error?.message || 'Unknown error',
      },
    };
  }
}

export async function handleVerifyPaymentRequest(body = {}) {
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = body;

  if (!orderId || !paymentId || !signature) {
    return {
      status: 400,
      body: { error: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature' },
    };
  }

  const config = getRazorpayConfig();
  if (config.error) return config.error;

  const expectedSignature = crypto
    .createHmac('sha256', config.key_secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (expectedSignature !== signature) {
    return {
      status: 400,
      body: { verified: false, error: 'Payment signature mismatch' },
    };
  }

  return {
    status: 200,
    body: {
      verified: true,
      message: 'Payment verified successfully',
      order_id: orderId,
      payment_id: paymentId,
    },
  };
}

function verifyWebhookSignature(rawBody, signature, webhookSecret) {
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  return expectedSignature === signature;
}

function extractPaymentEntity(event) {
  const payment = event?.payload?.payment?.entity;
  if (payment) return payment;

  const nested = event?.payload?.payment;
  if (nested?.entity) return nested.entity;

  return null;
}

export async function handleRazorpayWebhook({ rawBody, signature } = {}) {
  const { webhook_secret: webhookSecret, mode } = getRazorpayCredentials();

  if (!webhookSecret) {
    return {
      status: 500,
      body: { error: `RAZORPAY_${mode.toUpperCase()}_WEBHOOK_SECRET is not configured` },
    };
  }

  if (!rawBody || !signature) {
    return {
      status: 400,
      body: { error: 'Missing webhook body or X-Razorpay-Signature header' },
    };
  }

  if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
    return {
      status: 400,
      body: { error: 'Invalid webhook signature' },
    };
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return {
      status: 400,
      body: { error: 'Invalid webhook JSON payload' },
    };
  }

  const eventType = event?.event ?? 'unknown';
  const payment = extractPaymentEntity(event);

  switch (eventType) {
    case 'payment.captured':
    case 'payment.authorized':
    case 'order.paid':
      console.log('✅ Razorpay webhook — payment success:', {
        event: eventType,
        payment_id: payment?.id,
        order_id: payment?.order_id,
        amount: payment?.amount,
        email: payment?.email,
        status: payment?.status,
      });
      break;
    case 'payment.failed':
      console.warn('⚠️ Razorpay webhook — payment failed:', {
        event: eventType,
        payment_id: payment?.id,
        order_id: payment?.order_id,
        error: payment?.error_description,
      });
      break;
    default:
      console.log('ℹ️ Razorpay webhook received:', eventType);
  }

  return {
    status: 200,
    body: {
      received: true,
      event: eventType,
    },
  };
}
