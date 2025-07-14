'use client';

import { AddPortfolioItemButton } from '@/components/Dashboard/AddPortfolioItemButton';
import { AuthGate } from '@/components/Dashboard/AuthGate';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

async function handleSelect(type: 'EVM' | 'TRON' | 'SOLANA', address: string) {
  console.log('Selected wallet type:', type);
  console.log('Entered wallet address:', address);

  const res = await fetch('/api/portfolio/addWallet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, address }),
  });
  const json = await res.json();
  if (!json.success) {
    // handle error
  }
}

export default function DashboardPage() {
  return (
    <AuthGate>
      <Box
        component="main"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
        px={{ xs: 2, md: 4 }}
        py={{ xs: 3, md: 5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <AddPortfolioItemButton onSelect={handleSelect} />
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} mb={4} sx={{ flexWrap: 'wrap' }}>
          {[
            { label: 'Total Value', value: '$—' },
            { label: 'Chains Tracked', value: '—' },
            { label: 'Assets Held', value: '—' },
          ].map((card, idx) => (
            <Paper
              key={idx}
              elevation={3}
              sx={{
                flex: '1 1 0',
                minWidth: 240,
                p: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h6" mt={1}>
                {card.value}
              </Typography>
            </Paper>
          ))}
        </Stack>

        <Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Recent Transactions
          </Typography>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              No transactions found.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </AuthGate>
  );
}
