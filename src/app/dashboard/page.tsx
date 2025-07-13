'use client';

import { AddPortfolioItemButton } from '@/components/Dashboard/AddPortfolioItemButton';
import { AuthGate } from '@/components/Dashboard/AuthGate';
import { RecentTransactions } from '@/components/Dashboard/RecentTransactions';
import { SummaryCards } from '@/components/Dashboard/SummaryCards';

async function handleSelect(type: 'EVM' | 'TRON' | 'SOLANA', address: string) {
  console.log('Selected wallet type:', type);
  console.log('Entered wallet address:', address);

  const verifyRes = await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  });
}

export default function DashboardPage() {
  return (
    <AuthGate>
      <main className="min-h-screen p-6 md:p-10 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <AddPortfolioItemButton onSelect={handleSelect} />
        </div>
        <SummaryCards />
        <RecentTransactions />
      </main>
    </AuthGate>
  );
}
