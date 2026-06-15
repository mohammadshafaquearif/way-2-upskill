import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleVerifyEnrollmentAccessRequest } from '../server/verifyEnrollmentAccess.mjs';
import { guardApiRequest } from '../server/security.mjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const guard = guardApiRequest(req, { rateKey: 'verify-enrollment-access', maxRequests: 30 });
  if (guard) {
    return res.status(guard.status).json(guard.body);
  }

  const result = await handleVerifyEnrollmentAccessRequest(req.body);
  return res.status(result.status).json(result.body);
}
