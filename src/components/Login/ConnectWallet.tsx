import { Copy } from 'lucide-react';

export function ConnectWallet({
  isConnected,
  address,
  onConnect,
  onDisconnect,
}: {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return isConnected && address ? (
    <div className="flex items-center justify-between w-full max-w-md p-4 border rounded-lg bg-green-50 border-green-200 dark:bg-zinc-800 dark:border-zinc-700">
      <div className="flex flex-col">
        <span className="text-sm text-zinc-600 dark:text-zinc-300">Connected wallet</span>
        <div className="flex items-center gap-2 mt-1">
          <code className="font-mono text-sm text-green-700 dark:text-green-400 truncate max-w-[200px]">
            {address}
          </code>
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded"
            title="Copy address"
          >
            <Copy className="h-4 w-4 text-zinc-500" />
          </button>
        </div>
      </div>
      <button
        onClick={onDisconnect}
        className="ml-4 px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Disconnect
      </button>
    </div>
  ) : (
    <button
      onClick={onConnect}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
    >
      Connect MetaMask
    </button>
  );
}
