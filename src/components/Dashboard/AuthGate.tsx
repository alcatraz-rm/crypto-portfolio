'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export function AuthGate({ children }: Props) {
  const { isLoggedIn, isLoading } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        minHeight="100vh"
        p={3}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" gutterBottom>
          You need to log in and sign a message to access your dashboard.
        </Typography>
        <Button variant="contained" component={Link} href="/login">
          Go to Login
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
}
