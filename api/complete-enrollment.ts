import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleCompleteEnrollmentRequest } from '../server/enrollmentWorkflow.mjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await handleCompleteEnrollmentRequest(req.body);
  return res.status(result.status).json(result.body);
}
