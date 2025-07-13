'use client';

interface Props {
  isLoggedIn: boolean;
  address?: string;
  error?: string | null;
}

export function LoginStatus({ isLoggedIn, address, error }: Props) {
  return (
    <>
      {isLoggedIn && <p className="text-green-500">✅ Logged in as {address}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
}
