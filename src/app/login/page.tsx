'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { useState } from 'react';

export default function LoginPage() {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    const connector = connectors.find(c => c.id === 'injected');
    if (connector) connect({ connector });
    else setError('MetaMask not found');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!isConnected ? (
        <>
          <button onClick={handleConnect} className="px-4 py-2 bg-blue-600 text-white rounded">
            Connect MetaMask
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <>
          <p>Connected as {address}</p>
            <button
            onClick={() => disconnect()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
            Disconnect
            </button>
        </>
      )}
    </div>
  );
}
