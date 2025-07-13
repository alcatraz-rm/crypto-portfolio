'use client';

interface Props {
  isLoggedIn: boolean;
  isLoading: boolean;
  onSign: () => void;
}

export function SignMessage({ isLoggedIn, isLoading, onSign }: Props) {
  return isLoggedIn ? (
    <span className="ml-2 text-green-500">✅ Signed in</span>
  ) : (
    <button
      onClick={onSign}
      disabled={isLoading}
      className="ml-2 px-2 py-1 text-sm bg-green-600 text-white rounded"
    >
      {isLoading ? 'Signing...' : 'Sign In'}
    </button>
  );
}
