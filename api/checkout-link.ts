import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  handleCreateCheckoutLinkRequest,
  handleResolveCheckoutLinkRequest,
} from '../server/checkoutPaymentLink.mjs';
import { guardApiRequest } from '../server/security.mjs';

function getAccessToken(req: VercelRequest) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const guard = guardApiRequest(req, { rateKey: 'resolve-checkout-link', maxRequests: 30 });
    if (guard) {
      return res.status(guard.status).json(guard.body);
    }

    const token = typeof req.query.t === 'string' ? req.query.t : '';
    const result = await handleResolveCheckoutLinkRequest({ token });
    return res.status(result.status).json(result.body);
  }

  if (req.method === 'POST') {
    const guard = guardApiRequest(req, { rateKey: 'create-checkout-link', maxRequests: 20 });
    if (guard) {
      return res.status(guard.status).json(guard.body);
    }

    const result = await handleCreateCheckoutLinkRequest({
      body: req.body,
      accessToken: getAccessToken(req),
    });
    return res.status(result.status).json(result.body);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
