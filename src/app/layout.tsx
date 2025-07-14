'use client';

import Navbar from '@/components/Navbar';
import { wagmiConfig } from '@/lib/wagmi';
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { AuthProvider } from './context/AuthContext';
import './globals.css';

const queryClient = new QueryClient();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark' as PaletteMode,
    background: {
      default: '#001E3C',
      paper: '#00274D',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('themeMode') as PaletteMode | null;
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    }
  }, []);

  const toggleTheme = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    localStorage.setItem('themeMode', next);
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={mode === 'dark' ? darkBlueTheme : lightTheme}>
          <CssBaseline />
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <Navbar mode={mode} toggleTheme={toggleTheme} />
                <Container maxWidth="lg">
                  <Box my={4}>{children}</Box>
                </Container>
                <Box
                  component="footer"
                  py={3}
                  textAlign="center"
                  bgcolor="background.paper"
                  color="text.secondary"
                >
                  &copy; {new Date().getFullYear()} CryptoTracker
                </Box>
              </AuthProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
