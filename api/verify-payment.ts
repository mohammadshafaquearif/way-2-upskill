import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleVerifyPaymentRequest } from '../server/razorpay.mjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await handleVerifyPaymentRequest(req.body);
  return res.status(result.status).json(result.body);
}
