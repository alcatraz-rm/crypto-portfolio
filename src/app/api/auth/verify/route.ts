import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { verifyMessage } from 'viem';

export async function POST(req: NextRequest) {
  const { address, signature, nonce } = await req.json();

  if (!address || !signature || !nonce) {
    return new NextResponse('Missing fields', { status: 400 });
  }

  const isValid = await verifyMessage({
    address,
    message: nonce,
    signature,
  });

  if (!isValid) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const token = jwt.sign({ address }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
