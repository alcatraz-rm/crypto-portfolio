'use client';

import Navbar from '@/components/Navbar';
import { wagmiConfig } from '@/lib/wagmi';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { AuthProvider } from './context/AuthContext';
import './globals.css';

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#001E3C',
      paper: '#00274D',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <Navbar />
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
