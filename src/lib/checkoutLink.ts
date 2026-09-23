export interface CreateCheckoutLinkResponse {
  token: string;
  url: string;
  expires_at: string;
}

export interface ResolveCheckoutLinkResponse {
  courseSlug: string;
  email: string;
  phone: string;
  name: string;
  autoPay: boolean;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const raw = await response.text();
  const data = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  if (!response.ok) {
    const statusLabel = response.status ? ` (HTTP ${response.status})` : '';
    throw new Error(
      (data.error as string) ||
        (data.details as string) ||
        `Request failed${statusLabel}${raw ? `: ${raw.slice(0, 160)}` : ''}`,
    );
  }
  return data as T;
}

export async function createCheckoutLink(
  params: {
    courseSlug: string;
    email: string;
    phone?: string;
    learnerName?: string;
    baseUrl?: string;
  },
  accessToken: string,
): Promise<CreateCheckoutLinkResponse> {
  const response = await fetch('/api/checkout-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });

  return parseJsonResponse<CreateCheckoutLinkResponse>(response);
}

export async function resolveCheckoutLink(token: string): Promise<ResolveCheckoutLinkResponse> {
  const response = await fetch(`/api/checkout-link?t=${encodeURIComponent(token)}`);
  return parseJsonResponse<ResolveCheckoutLinkResponse>(response);
}
