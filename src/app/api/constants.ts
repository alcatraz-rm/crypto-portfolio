import { WalletType } from '@/generated/prisma';

export const WALLET_TYPES: WalletType[] = ['EVM', 'SOLANA', 'TRON'];

export enum SupportedEvmChains {
  EthMainnet = 'eth-mainnet', // 1
  ZkSyncMainnet = 'zksync-mainnet', // 324
  OptimismMainnet = 'opt-mainnet', // 10
  PolygonMainnet = 'polygon-mainnet', // 137
  ArbitrumMainnet = 'arb-mainnet', // 42161
  ArbitrumNova = 'arbnova-mainnet', // 42170
  BlastMainnet = 'blast-mainnet', // 81457
  LineaMainnet = 'linea-mainnet', // 59144
  BeraChainMainnet = 'berachain-mainnet', // 80094
  BaseMainnet = 'base-mainnet', // 8453
  AvalancheMainnet = 'avax-mainnet', // 43114
  BnbMainnet = 'bnb-mainnet', // 56
  GnosisMainnet = 'gnosis-mainnet', // 100
  SonicMainnet = 'sonic-mainnet', // 146
  ScrollMainnet = 'scroll-mainnet', // 534352
  //   OpBnbMainnet = 'opbnb-mainnet', // 204
}

export const supportedEvmChainsArray: SupportedEvmChains[] = [
  SupportedEvmChains.EthMainnet,
  SupportedEvmChains.ZkSyncMainnet,
  SupportedEvmChains.OptimismMainnet,
  SupportedEvmChains.PolygonMainnet,
  SupportedEvmChains.ArbitrumMainnet,
  SupportedEvmChains.ArbitrumNova,
  SupportedEvmChains.BlastMainnet,
  SupportedEvmChains.LineaMainnet,
  SupportedEvmChains.BeraChainMainnet,
  SupportedEvmChains.BaseMainnet,
  SupportedEvmChains.AvalancheMainnet,
  SupportedEvmChains.BnbMainnet,
  SupportedEvmChains.GnosisMainnet,
  //   SupportedEvmChains.SonicMainnet,
  SupportedEvmChains.ScrollMainnet,
  //   SupportedEvmChains.OpBnbMainnet,
];
