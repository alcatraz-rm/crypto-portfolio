'use client';

import { ConnectWallet } from '@/components/Login/ConnectWallet';
import { SignMessage } from '@/components/Login/SignMessage';
import { useLogin } from '@/hooks/useLogin';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box, CircularProgress, Container, Typography } from '@mui/material';

export default function LoginPage() {
  const {
    address,
    isConnected,
    error,
    isLoading,
    isLoggedIn,
    handleConnect,
    handleLogin,
    handleDisconnect,
  } = useLogin();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        pt: 4,
        pb: 4,
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" align="center">
        Sign In
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <AccountBalanceWalletIcon color={isConnected ? 'success' : 'action'} />
          <Typography variant="body1">
            {isConnected ? `Connected as ${address}` : 'Connect your wallet'}
          </Typography>
        </Box>
        <ConnectWallet
          isConnected={isConnected}
          address={address}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">Sign the login message</Typography>
        <SignMessage isLoggedIn={isLoggedIn} isLoading={isLoading} onSign={handleLogin} />
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
