export type AuthHashResult = {
  accessToken: string | null;
  type: string | null;
  error: string | null;
  errorCode: string | null;
  errorDescription: string | null;
};

export function parseAuthHash(hash = window.location.hash): AuthHashResult {
  const raw = hash.replace(/^#/, '');
  if (!raw) {
    return {
      accessToken: null,
      type: null,
      error: null,
      errorCode: null,
      errorDescription: null,
    };
  }

  const params = new URLSearchParams(raw);
  return {
    accessToken: params.get('access_token'),
    type: params.get('type'),
    error: params.get('error'),
    errorCode: params.get('error_code'),
    errorDescription: params.get('error_description')?.replace(/\+/g, ' ') ?? null,
  };
}

export function hasAuthHash(hash = window.location.hash): boolean {
  const parsed = parseAuthHash(hash);
  return Boolean(parsed.accessToken || parsed.error);
}

export function clearAuthHash(): void {
  if (!window.location.hash) return;
  window.history.replaceState({}, '', window.location.pathname + window.location.search);
}

export function authErrorMessage(errorCode: string | null, errorDescription: string | null): string {
  if (errorCode === 'otp_expired') {
    return 'This password reset link has expired. Reset links are valid for about 1 hour — request a new one below.';
  }
  if (errorCode === 'access_denied' && errorDescription) {
    return errorDescription;
  }
  return errorDescription || 'This link is invalid or has expired. Please request a new password reset email.';
}
