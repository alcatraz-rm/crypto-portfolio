import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

export function useLogin() {
  const router = useRouter();
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { isLoggedIn, setIsLoggedIn, isLoading } = useAuth();
  const { signMessageAsync } = useSignMessage();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    const connector = connectors.find((c) => c.id === 'injected');
    if (connector) connect({ connector });
    else setError('MetaMask not found');
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!address) throw new Error('No connected address');

      const res = await fetch('/api/auth/nonce');
      const { nonce } = await res.json();

      const signature = await signMessageAsync({ message: nonce });

      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, nonce }),
      });

      if (!verifyRes.ok) throw new Error('Signature verification failed');

      setIsLoggedIn(true);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return {
    address,
    isConnected,
    error,
    isLoading: loading || isLoading,
    isLoggedIn,
    handleConnect,
    handleDisconnect,
    handleLogin,
  };
}
