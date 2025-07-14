'use client';

import { Box, Paper, Typography } from '@mui/material';

export function RecentTransactions() {
  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" fontStyle="italic">
          No transactions found.
        </Typography>
      </Paper>
    </Box>
  );
}
