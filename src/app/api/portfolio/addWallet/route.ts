import { Prisma } from '@/generated/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { isValidAddress } from '@/utils/validateAddress';
import { NextRequest, NextResponse } from 'next/server';
import { WALLET_TYPES } from '../../constants';

export async function POST(req: NextRequest) {
  const user = getAuthenticatedUser(req);

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { address } = await req.json();
  let isValid = false;

  for (const type of WALLET_TYPES) {
    if (isValidAddress(address, type)) {
      isValid = true;

      try {
        await prisma.wallet.create({
          data: {
            address,
            userId: user.userId,
            type,
          },
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          return new NextResponse('Wallet address already exists.', { status: 409 });
        }

        console.error('Unexpected DB error:', err);
        return new NextResponse('Internal server error.', { status: 500 });
      }

      break;
    }
  }

  if (!isValid) {
    if (!user) {
      return new NextResponse('Invalid address', { status: 400 });
    }
  }

  return NextResponse.json({ success: true });
}
