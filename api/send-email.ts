import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleSendEmailRequest } from '../server/sendEmail.mjs';
import { guardApiRequest } from '../server/security.mjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const guard = guardApiRequest(req, { rateKey: 'send-email', maxRequests: 10 });
  if (guard) {
    return res.status(guard.status).json(guard.body);
  }

  const result = await handleSendEmailRequest(req.body);
  return res.status(result.status).json(result.body);
}
