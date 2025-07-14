import { verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface UserJwt {
  address: string;
  userId: number;
}

export function getAuthenticatedUser(req: NextRequest): UserJwt | null {
  const token = req.cookies.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as UserJwt;
    return decoded;
  } catch {
    return null;
  }
}
