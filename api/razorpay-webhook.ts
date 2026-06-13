import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleRazorpayWebhook } from '../server/razorpay.mjs';

export const config = {
  api: {
    bodyParser: false,
  },
};

function readRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers['x-razorpay-signature'];

  const result = await handleRazorpayWebhook({
    rawBody,
    signature: typeof signature === 'string' ? signature : undefined,
  });

  return res.status(result.status).json(result.body);
}
