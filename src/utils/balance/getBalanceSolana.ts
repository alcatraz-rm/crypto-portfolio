import { get } from 'env-var';

const ALCHEMY_API_KEY = get('ALCHEMY_API_KEY').required().asString();
const ALCHEMY_SOLANA_RPC = `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
const COINGECKO_SIMPLE_PRICE =
  'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';
const LAMPORTS_PER_SOL = 1e9;

export interface SolanaTokenBalance {
  mint: string;
  amount: number;
  decimals: number;
}

interface SolanaTokenBalanceMap {
  [mint: string]: SolanaTokenBalance;
}

export async function fetchBalanceSolana(
  address: string,
): Promise<Record<string, SolanaTokenBalance>> {
  const balanceRes = await fetch(ALCHEMY_SOLANA_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getBalance',
      params: [address, { commitment: 'finalized' }],
    }),
  });
  const balanceJson = await balanceRes.json();
  const lamports = balanceJson.result?.value as number;
  const result: Record<string, SolanaTokenBalance> = {
    SOL: {
      mint: 'SOL',
      amount: lamports / LAMPORTS_PER_SOL,
      decimals: 9,
    },
  };

  const tokensRes = await fetch(ALCHEMY_SOLANA_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getTokenAccountsByOwner',
      params: [
        address,
        { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
        { encoding: 'jsonParsed' },
      ],
    }),
  });
  const tokensJson = await tokensRes.json();

  for (const { account } of tokensJson.result.value as any[]) {
    const info = account.data.parsed.info;
    const mint: string = info.mint;
    const uiAmount: number = info.tokenAmount.uiAmount || 0;
    const decimals: number = info.tokenAmount.decimals;
    result[mint] = { mint, amount: uiAmount, decimals };
  }

  return result;
}

export async function fetchSolanaTokenInfo(mint: string): Promise<{
  symbol: string;
  name: string;
  logo: string;
  priceUsd: number;
  decimals: number;
}> {
  const platform = 'solana';
  const url = `https://api.coingecko.com/api/v3/coins/solana/contract/${mint}`;

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`CoinGecko error ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();

  return {
    symbol: (json.symbol ?? '').toUpperCase(),
    name: json.name ?? mint,
    logo: json.image?.small ?? '',
    priceUsd: json.market_data?.current_price?.usd ?? 0,
    // For Solana contracts, CoinGecko may not always supply decimal info here;
    // if missing, you’ll need to fetch it on‐chain via Solana RPC (getMintInfo).
    decimals: json.detail_platforms?.[platform]?.decimal_place ?? 9,
  };
}

export async function calculateTotalSolanaBalanceUsd(address: string): Promise<number> {
  const balances: SolanaTokenBalanceMap = await fetchBalanceSolana(address);

  let totalUsd = 0;

  const solRes = await fetch(COINGECKO_SIMPLE_PRICE);
  if (!solRes.ok) {
    throw new Error(`CoinGecko SOL price fetch failed: ${solRes.status}`);
  }
  const solJson = await solRes.json();
  const solPrice: number = solJson['solana']?.usd ?? 0;

  await Promise.all(
    Object.entries(balances).map(async ([mint, bal]) => {
      let priceUsd = 0;

      if (mint === 'SOL') {
        priceUsd = solPrice;
      } else {
        try {
          const info = await fetchSolanaTokenInfo(mint);
          priceUsd = info.priceUsd;
        } catch (e) {
          console.warn(`Failed to fetch token info for ${mint}:`, e);
          priceUsd = 0;
        }
      }

      totalUsd += bal.amount * priceUsd;
    }),
  );

  return totalUsd;
}
