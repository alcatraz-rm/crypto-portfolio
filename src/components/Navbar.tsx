'use client';

import { useAuth } from '@/app/context/AuthContext';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, isLoading } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsLoggedIn(false);
    router.push('/login');
  };

  if (!hasMounted || isLoading) return null;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          CryptoTracker
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} href="/" color="inherit">
            Home
          </Button>
          <Button component={Link} href="/dashboard" color="inherit">
            Dashboard
          </Button>
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
