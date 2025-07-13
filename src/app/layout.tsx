'use client';

import { wagmiConfig } from '@/lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { AuthProvider, useAuth } from './context/AuthContext';
import './globals.css';

const queryClient = new QueryClient();

export function Navbar() {
  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();

  const { isLoggedIn, setIsLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || isLoading) {
    return null;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-800 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        CryptoTracker
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="cursor-pointer text-red-600 font-medium">
            Logout
          </button>
        ) : (
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Navbar />
              {children}
              {/* FOOTER */}
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
