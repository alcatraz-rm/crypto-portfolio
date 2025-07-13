"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  const { address } = useAccount();

  const { isLoggedIn, setIsLoggedIn } = useAuth();

    useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <main className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Multi-Chain Crypto Portfolio Tracker
      </h1>

      {isLoggedIn ? (
        <>
          <p className="mb-2">✅ Logged in: {address}</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to Dashboard
          </Link>
        </>
      ) : (
        <>
          <p className="mb-4">
            Connect your wallet to start tracking your portfolio.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log in with MetaMask
          </Link>
        </>
      )}
    </main>
  );
}
