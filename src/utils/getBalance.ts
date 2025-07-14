import { SupportedEvmChains } from '@/app/api/constants';
import { get } from 'env-var';
import { TokensByAddressApiResponse } from './balance/types';

const ALCHEMY_API_KEY = get('ALCHEMY_API_KEY').required().asString();

export async function fetchBalanceByChains(
  address: string,
  networks: SupportedEvmChains[],
): Promise<Record<string, number>> {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

  const body = {
    addresses: [
      {
        address,
        networks,
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} – ${text}`);
  }

  const tokensResp: TokensByAddressApiResponse = JSON.parse(text);
  console.log(JSON.stringify(tokensResp));
  const balanceByChains = calculateBalanceByChain(tokensResp);

  return balanceByChains;
}

function calculateBalanceByChain(resp: TokensByAddressApiResponse): Record<string, number> {
  const result: Record<string, number> = {};

  for (const token of resp.data.tokens) {
    const priceObj = token.tokenPrices.find((p) => p.currency.toLowerCase() === 'usd');
    if (!priceObj) continue;

    const price = parseFloat(priceObj.value);
    if (isNaN(price)) continue;

    const raw = BigInt(token.tokenBalance);

    const decimals = token.tokenMetadata.decimals ?? 18;
    const amount = Number(raw) / Math.pow(10, decimals);

    const usdValue = amount * price;

    if (!result[token.network]) {
      result[token.network] = 0;
    }
    result[token.network] += usdValue;
  }

  return result;
}
