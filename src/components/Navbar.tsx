'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useAccount } from 'wagmi';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ mode, toggleTheme }: NavbarProps) {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, isLoading } = useAuth();
  const { address, isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || isLoading) return null;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          CryptoTracker
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <ThemeSwitcher mode={mode} toggleTheme={toggleTheme} />

          <Button component={Link} href="/" color="inherit">
            Home
          </Button>
          <Button component={Link} href="/dashboard" color="inherit">
            Dashboard
          </Button>

          {isLoggedIn && isConnected && address && (
            <Typography
              variant="body2"
              sx={{ fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {address}
            </Typography>
          )}

          {isLoggedIn ? (
            <IconButton color="error" onClick={handleLogout} title="Logout">
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton component={Link} href="/login" color="primary" title="Login">
              <LoginIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
