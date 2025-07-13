'use client';

import './globals.css';
import Link from 'next/link';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-white text-black dark:bg-zinc-900 dark:text-white">
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {/* NAVBAR */}
            <nav className="w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-800 flex justify-between items-center shadow-sm">
              <Link href="/" className="text-xl font-bold">
                CryptoTracker
              </Link>
              <div className="flex gap-4">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </div>
            </nav>

            {/* PAGE CONTENT */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>

            {/* FOOTER */}
            <footer className="w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-800 text-center text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} CryptoTracker
            </footer>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
