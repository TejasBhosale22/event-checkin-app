import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

const mockUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

export const createContext = ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { email?: string; userId?: string };

      // Support either mock email or actual userId
      if (decoded.email) {
        user = mockUsers.find((u) => u.email === decoded.email) || null;
      } else if (decoded.userId) {
        user = { id: decoded.userId }; // minimal shape
      }
    } catch {
      user = null;
    }
  }

  return {
    prisma,
    user,
    io: req.app.get('io'),
  };
};

export type Context = ReturnType<typeof createContext>;
