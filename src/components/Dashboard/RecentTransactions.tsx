'use client';

export function RecentTransactions() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      <div className="rounded-lg bg-white dark:bg-zinc-800 p-4 shadow text-sm">
        <p className="text-zinc-500 italic">No transactions found.</p>
      </div>
    </section>
  );
}
