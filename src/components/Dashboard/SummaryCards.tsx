'use client';

import { Box, Paper, Typography } from '@mui/material';
import { useAccount } from 'wagmi';

export function SummaryCards() {
  const { isConnected, address } = useAccount();

  return (
    <Box mb={4}>
      {isConnected ? (
        <Typography variant="body2" color="text.secondary" mb={2}>
          Welcome,{' '}
          <Box component="span" fontFamily="monospace">
            {address}
          </Box>
        </Typography>
      ) : (
        <Typography variant="body2" color="error" mb={2}>
          Wallet not connected
        </Typography>
      )}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {[
          { label: 'Total Value', value: '$—' },
          { label: 'Chains Tracked', value: '—' },
          { label: 'Assets Held', value: '—' },
        ].map((card, idx) => (
          <Paper key={idx} elevation={3} sx={{ p: 2, flex: '1 1 200px', textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              {card.label}
            </Typography>
            <Typography variant="h6">{card.value}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
