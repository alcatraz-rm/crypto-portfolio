'use client';

import { Navbar } from '@/components/Navbar';
import { wagmiConfig } from '@/lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { AuthProvider } from './context/AuthContext';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Navbar />
              {children}
              <footer className="w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-800 text-center text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} CryptoTracker
              </footer>
            </AuthProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
