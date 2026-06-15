import type { IncomingMessage } from 'http';

export interface ApiGuardOptions {
  rateKey?: string;
  maxRequests?: number;
}

export interface ApiGuardError {
  status: number;
  body: { error: string };
}

export function isAllowedOrigin(origin: string | undefined): boolean;

export function checkOrigin(req: IncomingMessage): ApiGuardError | null;

export function rateLimit(
  key: string,
  options?: { max?: number; windowMs?: number },
): ApiGuardError | null;

export function getClientIp(req: IncomingMessage): string;

export function guardApiRequest(
  req: IncomingMessage,
  options?: ApiGuardOptions,
): ApiGuardError | null;

export function validateEmailType(type: string): boolean;

export function isValidEmail(email: string): boolean;
