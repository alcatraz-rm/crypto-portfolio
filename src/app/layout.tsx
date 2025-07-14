'use client';

import Navbar from '@/components/Navbar';
import { wagmiConfig } from '@/lib/wagmi';
import { Box, Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { AuthProvider } from './context/AuthContext';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <CssBaseline />
              <Navbar />
              <Container maxWidth="lg">
                <Box my={4}>{children}</Box>
              </Container>
              <Box
                component="footer"
                py={3}
                textAlign="center"
                bgcolor="background.default"
                color="text.secondary"
              >
                &copy; {new Date().getFullYear()} CryptoTracker
              </Box>
            </AuthProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
