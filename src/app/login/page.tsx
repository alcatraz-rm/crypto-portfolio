'use client';

import router from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { isLoggedIn, setIsLoggedIn, isLoading } = useAuth();
  // const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handleConnect = () => {
    const connector = connectors.find((c) => c.id === 'injected');
    if (connector) connect({ connector });
    else setError('MetaMask not found');
  };

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!address) throw new Error('No connected address');

      const res = await fetch('/api/auth/nonce');
      const { nonce } = await res.json();

      const signature = await signMessageAsync({ message: nonce });

      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, nonce }),
      });

      if (!verifyRes.ok) {
        throw new Error('Signature verification failed');
      }

      setIsLoggedIn(true);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      <ol className="text-left text-sm mb-6 list-decimal list-inside">
        <li>
          Connect your wallet
          {isConnected ? (
            <span className="ml-2 text-green-500">(Connected as {address})</span>
          ) : (
            <button
              onClick={handleConnect}
              className="ml-2 px-2 py-1 text-sm bg-blue-600 text-white rounded"
            >
              Connect MetaMask
            </button>
          )}
        </li>

        <li className="mt-2">
          Sign the login message
          {isLoggedIn ? (
            <span className="ml-2 text-green-500"></span>
          ) : (
            <button
              onClick={handleLogin}
              disabled={loading}
              className="ml-2 px-2 py-1 text-sm bg-green-600 text-white rounded"
            >
              {loading ? 'Signing...' : 'Sign In'}
            </button>
          )}
        </li>
      </ol>

      {isLoggedIn && <p className="text-green-500">✅ Logged in as {address}</p>}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
