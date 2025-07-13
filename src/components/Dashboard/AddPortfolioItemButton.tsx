'use client';

import { isValidAddress } from '@/utils/validateAddress';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AddPortfolioItemButton({
  onSelect,
}: {
  onSelect: (type: 'EVM' | 'TRON' | 'SOLANA', address: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'EVM' | 'TRON' | 'SOLANA' | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const menuItems = [
    { type: 'EVM', label: 'EVM Wallet', icon: '/icons/evm.svg' },
    { type: 'TRON', label: 'TRON Wallet', icon: '/icons/tron.svg' },
    { type: 'SOLANA', label: 'Solana Wallet', icon: '/icons/solana.svg' },
  ] as const;

  const handleSelect = (type: (typeof menuItems)[number]['type']) => {
    setSelectedType(type);
    setMenuOpen(false);
    setIsModalOpen(true);
    setWalletAddress('');
    setError(null);
  };

  const handleSubmit = () => {
    if (!walletAddress.trim()) {
      setError('Wallet address is required');
      return;
    }

    const addr = walletAddress.trim();

    if (!isValidAddress(walletAddress, selectedType!)) {
      setError(`Invalid ${selectedType} address`);
      return;
    }

    onSelect(selectedType!, addr);
    setIsModalOpen(false);
    setWalletAddress('');
    setError(null);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Portfolio Item
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 bg-white dark:bg-zinc-800 rounded shadow-lg border border-gray-200 dark:border-zinc-700">
          {menuItems.map((item) => (
            <button
              key={item.type}
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700"
              onClick={() => handleSelect(item.type)}
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {isModalOpen && selectedType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Add {selectedType} Wallet</h2>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value);
                if (error) setError(null);
              }}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:underline"
                onClick={() => {
                  setIsModalOpen(false);
                  setWalletAddress('');
                  setError(null);
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
