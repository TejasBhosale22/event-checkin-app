import jwt from 'jsonwebtoken';

const mockUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' }
];

export function getUserFromToken(token: string, secret: string) {
  try {
    const decoded: any = jwt.verify(token.replace('Bearer ', ''), secret);
    return mockUsers.find(u => u.email === decoded.email);
  } catch {
    return null;
  }
}

export function generateMockToken(email: string, secret: string) {
  return jwt.sign({ email }, secret, { expiresIn: '1d' });
}
