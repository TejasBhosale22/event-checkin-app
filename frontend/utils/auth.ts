import {jwtDecode} from 'jwt-decode';

// This must match your backend JWT_SECRET
const JWT_SECRET = 'super-secret-key'; // Use env in real apps

// Generate a valid mock token (signed manually or by backend beforehand)
export function generateMockToken(email: string): string {
  // This mimics what your backend expects: a token containing an email
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day expiry
  };

  const base64UrlEncode = (obj: any) =>
    btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  // ⚠️ FAKE signature — backend won’t verify it unless it’s ignored or mocked
  const signature = 'mock-signature';

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Decode a mock token to read the email (client-only)
export function decodeToken(token: string): { email: string } | null {
  try {
    return jwtDecode<{ email: string }>(token);
  } catch {
    return null;
  }
}
