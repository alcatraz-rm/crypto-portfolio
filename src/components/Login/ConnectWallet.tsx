'use client';

interface Props {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
}

export function ConnectWallet({ isConnected, address, onConnect }: Props) {
  return isConnected ? (
    <span className="ml-2 text-green-500">(Connected as {address})</span>
  ) : (
    <button onClick={onConnect} className="ml-2 px-2 py-1 text-sm bg-blue-600 text-white rounded">
      Connect MetaMask
    </button>
  );
}
