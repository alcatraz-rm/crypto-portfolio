'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
