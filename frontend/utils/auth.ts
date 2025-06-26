import {jwtDecode} from 'jwt-decode';


const JWT_SECRET = 'super-secret-key'; 


export function generateMockToken(email: string): string {
 
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, 
  };

  const base64UrlEncode = (obj: any) =>
    btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);


  const signature = 'mock-signature';

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}


export function decodeToken(token: string): { email: string } | null {
  try {
    return jwtDecode<{ email: string }>(token);
  } catch {
    return null;
  }
}
