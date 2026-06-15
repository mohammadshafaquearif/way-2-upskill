const rateLimitStore = new Map();

const ALLOWED_ORIGINS = new Set(
  [
    process.env.PORTAL_URL,
    process.env.VITE_APP_URL,
    'https://www.zyvotrix.com',
    'https://zyvotrix.com',
    process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : null,
    process.env.NODE_ENV !== 'production' ? 'http://localhost:5173' : null,
    process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : null,
    process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5173' : null,
  ].filter(Boolean),
);

const EMAIL_TYPES = new Set(['contact', 'enrollment', 'inquiry', 'signup']);

export function isAllowedOrigin(origin) {
  if (!origin) return true;
  return ALLOWED_ORIGINS.has(origin);
}

export function checkOrigin(req) {
  const origin = req.headers?.origin;
  if (!origin) return null;
  if (!isAllowedOrigin(origin)) {
    return { status: 403, body: { error: 'Origin not allowed' } };
  }
  return null;
}

export function rateLimit(key, { max = 20, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const bucket = rateLimitStore.get(key);

  if (!bucket || now - bucket.start > windowMs) {
    rateLimitStore.set(key, { start: now, count: 1 });
    return null;
  }

  bucket.count += 1;
  if (bucket.count > max) {
    return { status: 429, body: { error: 'Too many requests. Please try again later.' } };
  }

  return null;
}

export function getClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {{ rateKey?: string; maxRequests?: number }} [options]
 * @returns {{ status: number; body: { error: string } } | null}
 */
export function guardApiRequest(req, { rateKey, maxRequests = 20 } = {}) {
  const originError = checkOrigin(req);
  if (originError) return originError;

  const ip = getClientIp(req);
  const limitError = rateLimit(rateKey || `${ip}:${req.url}`, { max: maxRequests });
  if (limitError) return limitError;

  return null;
}

export function validateEmailType(type) {
  return EMAIL_TYPES.has(type);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}
