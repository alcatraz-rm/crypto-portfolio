'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const [hasMounted, setHasMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (!hasMounted) return null;

  if (isLoggedIn === null) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authorization...</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-2xl font-semibold mb-4 text-red-600">Access Denied</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-md">
          You need to log in and sign a message to access your dashboard.
        </p>
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-10 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {isConnected ? (
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Welcome, <span className="font-mono">{address}</span>
        </p>
      ) : (
        <p className="mb-6 text-sm text-red-500">Wallet not connected</p>
      )}

      {/* Portfolio Summary */}
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

      {/* Recent Transactions */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
        <div className="rounded-lg bg-white dark:bg-zinc-800 p-4 shadow text-sm">
          <p className="text-zinc-500 italic">No transactions found.</p>
        </div>
      </section>
    </main>
  );
}
