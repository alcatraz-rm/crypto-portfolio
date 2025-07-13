import { PublicKey } from '@solana/web3.js';
import { TronWeb } from 'tronweb';
import { isAddress as isEvmAddress } from 'viem';

export function isValidAddress(address: string, type: 'EVM' | 'TRON' | 'SOLANA'): boolean {
  switch (type) {
    case 'EVM':
      return isEvmAddress(address);
    case 'TRON':
      return TronWeb.isAddress(address);
    case 'SOLANA':
      try {
        new PublicKey(address);
        return true;
      } catch {
        return false;
      }
    default:
      return false;
  }
}
