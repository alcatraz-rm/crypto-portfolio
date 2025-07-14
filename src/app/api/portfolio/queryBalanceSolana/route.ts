import { getAuthenticatedUser } from '@/lib/auth';
import { calculateTotalSolanaBalanceUsd } from '@/utils/balance/getBalanceSolana';
import { isValidAddress } from '@/utils/validateAddress';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = getAuthenticatedUser(req);

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const address = req.nextUrl.searchParams.get('address');

  if (!address) {
    return new NextResponse('Address is required', { status: 400 });
  }

  if (!isValidAddress(address, 'SOLANA')) {
    return new NextResponse('Invalid Solana wallet', { status: 400 });
  }

  try {
    const balance = await calculateTotalSolanaBalanceUsd(address);
    return NextResponse.json({ balance }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'internal server error' });
  }
}
