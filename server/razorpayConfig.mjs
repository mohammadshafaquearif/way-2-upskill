/**
 * Razorpay mode: local dev → test keys, Vercel production → live keys.
 * Override anytime with RAZORPAY_MODE=test|live
 */
export function getRazorpayMode() {
  if (process.env.RAZORPAY_MODE === 'test' || process.env.RAZORPAY_MODE === 'live') {
    return process.env.RAZORPAY_MODE;
  }

  const onVercelProduction =
    process.env.VERCEL === '1' &&
    process.env.VERCEL_ENV === 'production';

  return onVercelProduction ? 'live' : 'test';
}

export function getRazorpayCredentials() {
  const mode = getRazorpayMode();

  if (mode === 'test') {
    return {
      mode,
      key_id:
        process.env.RAZORPAY_TEST_KEY_ID ||
        process.env.RAZORPAY_KEY_ID ||
        '',
      key_secret:
        process.env.RAZORPAY_TEST_KEY_SECRET ||
        process.env.RAZORPAY_KEY_SECRET ||
        '',
      webhook_secret:
        process.env.RAZORPAY_TEST_WEBHOOK_SECRET ||
        process.env.RAZORPAY_WEBHOOK_SECRET ||
        '',
    };
  }

  return {
    mode,
    key_id:
      process.env.RAZORPAY_LIVE_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      '',
    key_secret:
      process.env.RAZORPAY_LIVE_KEY_SECRET ||
      process.env.RAZORPAY_KEY_SECRET ||
      '',
    webhook_secret:
      process.env.RAZORPAY_LIVE_WEBHOOK_SECRET ||
      process.env.RAZORPAY_WEBHOOK_SECRET ||
      '',
  };
}

export function isRazorpayTestMode() {
  return getRazorpayMode() === 'test';
}
