'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export function AuthGate({ children }: Props) {
  const { isLoggedIn, isLoading } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

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

  return <>{children}</>;
}
