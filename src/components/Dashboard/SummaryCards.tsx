'use client';

import { useAccount } from 'wagmi';

export function SummaryCards() {
  const { isConnected, address } = useAccount();

  return (
    <>
      {isConnected ? (
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Welcome, <span className="font-mono">{address}</span>
        </p>
      ) : (
        <p className="mb-6 text-sm text-red-500">Wallet not connected</p>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Portfolio Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white dark:bg-zinc-800 p-4 shadow">
            <h3 className="text-sm text-zinc-500">Total Value</h3>
            <p className="text-lg font-medium">$—</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-zinc-800 p-4 shadow">
            <h3 className="text-sm text-zinc-500">Chains Tracked</h3>
            <p className="text-lg font-medium">—</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-zinc-800 p-4 shadow">
            <h3 className="text-sm text-zinc-500">Assets Held</h3>
            <p className="text-lg font-medium">—</p>
          </div>
        </div>
      </section>
    </>
  );
}
