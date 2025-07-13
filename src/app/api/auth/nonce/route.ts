import { NextResponse } from 'next/server';

export async function GET() {
  const nonce = `Login request at ${Date.now()}`;
  return NextResponse.json({ nonce });
}
