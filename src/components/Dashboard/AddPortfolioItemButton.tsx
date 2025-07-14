'use client';

import { isValidAddress } from '@/utils/validateAddress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useState } from 'react';

export function AddPortfolioItemButton({
  onSelect,
}: {
  onSelect: (type: 'EVM' | 'TRON' | 'SOLANA', address: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'EVM' | 'TRON' | 'SOLANA' | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onTypeSelect = (type: 'EVM' | 'TRON' | 'SOLANA') => {
    setSelectedType(type);
    setDialogOpen(true);
    setWalletAddress('');
    setError(null);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedType(null);
    setWalletAddress('');
    setError(null);
  };

  const handleConfirm = () => {
    const addr = walletAddress.trim();
    if (!addr) {
      setError('Wallet address is required');
      return;
    }
    if (!isValidAddress(addr, selectedType!)) {
      setError(`Invalid ${selectedType} address`);
      return;
    }
    onSelect(selectedType!, addr);
    handleDialogClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleMenuOpen}>
        Add Portfolio Item
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => onTypeSelect('EVM')}>
          <ListItemIcon>
            <Image src="/icons/evm.svg" alt="EVM" width={20} height={20} />
          </ListItemIcon>
          <ListItemText>EVM Wallet</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onTypeSelect('TRON')}>
          <ListItemIcon>
            <Image src="/icons/tron.svg" alt="TRON" width={20} height={20} />
          </ListItemIcon>
          <ListItemText>TRON Wallet</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onTypeSelect('SOLANA')}>
          <ListItemIcon>
            <Image src="/icons/solana.svg" alt="Solana" width={20} height={20} />
          </ListItemIcon>
          <ListItemText>Solana Wallet</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add {selectedType} Wallet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Wallet Address"
            type="text"
            fullWidth
            variant="outlined"
            value={walletAddress}
            onChange={(e) => {
              setWalletAddress(e.target.value);
              if (error) setError(null);
            }}
            error={Boolean(error)}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
