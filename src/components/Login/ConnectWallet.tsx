'use client';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, IconButton, Tooltip } from '@mui/material';

interface ConnectWalletProps {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function ConnectWallet({
  isConnected,
  address,
  onConnect,
  onDisconnect,
}: ConnectWalletProps) {
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return isConnected && address ? (
    <Box display="flex" alignItems="center" gap={1}>
      <Tooltip title="Copy address">
        <IconButton size="small" onClick={handleCopy}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Button variant="outlined" color="error" size="small" onClick={onDisconnect}>
        Disconnect
      </Button>
    </Box>
  ) : (
    <Button variant="contained" color="primary" onClick={onConnect}>
      Connect MetaMask
    </Button>
  );
}
