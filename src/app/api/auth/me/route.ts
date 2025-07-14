import { UserJwt } from '@/lib/auth';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({
      authenticated: true,
      address: (decoded as UserJwt).address,
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
