'use client';

import { Button, Typography } from '@mui/material';

interface SignMessageProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  onSign: () => void;
}

export function SignMessage({ isLoggedIn, isLoading, onSign }: SignMessageProps) {
  return isLoggedIn ? (
    <Typography variant="body2" color="success.main">
      ✅ Signed in
    </Typography>
  ) : (
    <Button variant="contained" color="success" onClick={onSign} disabled={isLoading}>
      {isLoading ? 'Signing...' : 'Sign In'}
    </Button>
  );
}
