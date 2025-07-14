import { getAuthenticatedUser } from '@/lib/auth';
import { fetchBalanceByChains } from '@/utils/getBalance';
import { isValidAddress } from '@/utils/validateAddress';
import { NextRequest, NextResponse } from 'next/server';
import { supportedEvmChainsArray } from '../../constants';

export async function GET(req: NextRequest) {
  const user = getAuthenticatedUser(req);

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const address = req.nextUrl.searchParams.get('address');

  if (!address) {
    return new NextResponse('Address is reequired', { status: 400 });
  }

  if (!isValidAddress(address, 'EVM')) {
    return new NextResponse('Invalid EVM wallet', { status: 400 });
  }

  try {
    const balanceByChains = await fetchBalanceByChains(address, supportedEvmChainsArray);
    return NextResponse.json(balanceByChains, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'internal server error' });
  }
}
