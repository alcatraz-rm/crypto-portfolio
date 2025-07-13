'use client';

import { AuthGate } from '@/components/Dashboard/AuthGate';
import { RecentTransactions } from '@/components/Dashboard/RecentTransactions';
import { SummaryCards } from '@/components/Dashboard/SummaryCards';

export default function DashboardPage() {
  return (
    <AuthGate>
      <main className="min-h-screen p-6 md:p-10 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <SummaryCards />
        <RecentTransactions />
      </main>
    </AuthGate>
  );
}
