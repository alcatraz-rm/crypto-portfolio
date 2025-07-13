'use client';

import { ConnectWallet } from '@/components/Login/ConnectWallet';
import { LoginStatus } from '@/components/Login/LoginStatus';
import { SignMessage } from '@/components/Login/SignMessage';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const { address, isConnected, error, isLoading, isLoggedIn, handleConnect, handleLogin } =
    useLogin();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <ol className="text-left text-sm mb-6 list-decimal list-inside">
        <li>
          <ConnectWallet isConnected={isConnected} address={address} onConnect={handleConnect} />
        </li>
        <li className="mt-2">
          <SignMessage isLoggedIn={isLoggedIn} onSign={handleLogin} isLoading={isLoading} />
        </li>
      </ol>

      <LoginStatus isLoggedIn={isLoggedIn} address={address} error={error} />
    </div>
  );
}
