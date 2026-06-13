export type RazorpayMode = 'test' | 'live';

export function getRazorpayMode(): RazorpayMode {
  const explicit = import.meta.env.VITE_RAZORPAY_MODE;
  if (explicit === 'test' || explicit === 'live') {
    return explicit;
  }

  // Local Vite dev server → test; production build → live
  return import.meta.env.DEV ? 'test' : 'live';
}

export function getRazorpayKeyId(): string {
  const mode = getRazorpayMode();

  if (mode === 'test') {
    return (
      import.meta.env.VITE_RAZORPAY_TEST_KEY_ID ||
      import.meta.env.VITE_RAZORPAY_KEY_ID ||
      ''
    );
  }

  return (
    import.meta.env.VITE_RAZORPAY_LIVE_KEY_ID ||
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    ''
  );
}

export function isRazorpayTestMode(): boolean {
  return getRazorpayMode() === 'test';
}
