import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleDownloadInvoiceRequest } from '../server/invoiceHandler.mjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const enrollmentId = typeof req.query.enrollmentId === 'string' ? req.query.enrollmentId : '';

  const result = await handleDownloadInvoiceRequest({ accessToken, enrollmentId });

  if (result.pdf) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    return res.status(200).send(result.pdf);
  }

  return res.status(result.status).json(result.body);
}
