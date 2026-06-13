/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_RAZORPAY_MODE?: 'test' | 'live';
  readonly VITE_RAZORPAY_TEST_KEY_ID?: string;
  readonly VITE_RAZORPAY_LIVE_KEY_ID?: string;
  readonly VITE_RAZORPAY_KEY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
