'use client';

import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const { address } = useAccount();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Multi-Chain Crypto Portfolio Tracker
      </Typography>

      {isLoggedIn ? (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ✅ Logged in: {address}
          </Typography>
          <Button variant="contained" color="success" component={Link} href="/dashboard">
            Go to Dashboard
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Connect your wallet to start tracking your portfolio.
          </Typography>
          <Button variant="contained" color="primary" component={Link} href="/login">
            Log in with MetaMask
          </Button>
        </>
      )}
    </Container>
  );
}
