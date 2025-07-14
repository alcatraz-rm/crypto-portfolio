'use client';

import { SupportedEvmChains, supportedEvmChainsArray } from '@/app/api/constants';
import { isValidAddress } from '@/utils/validateAddress';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  onSelect: (chain: 'EVM' | 'TRON' | 'SOLANA', address: string, chains?: string[]) => void;
}

const chainDisplayNames: Record<SupportedEvmChains, string> = {
  'eth-mainnet': 'Ethereum Mainnet',
  'zksync-mainnet': 'zkSync Mainnet',
  'opt-mainnet': 'Optimism Mainnet',
  'polygon-mainnet': 'Polygon Mainnet',
  'arb-mainnet': 'Arbitrum One',
  'arbnova-mainnet': 'Arbitrum Nova',
  'blast-mainnet': 'Blast Mainnet',
  'linea-mainnet': 'Linea Mainnet',
  'berachain-mainnet': 'Berachain Mainnet',
  'base-mainnet': 'Base Mainnet',
  'avax-mainnet': 'Avalanche Mainnet',
  'bnb-mainnet': 'Binance Smart Chain',
  'gnosis-mainnet': 'Gnosis Chain',
  'sonic-mainnet': 'Sonic Mainnet',
  'scroll-mainnet': 'Scroll Mainnet',
};

export function AddPortfolioItemButton({ onSelect }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Wallet-entry dialog state
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'EVM' | 'TRON' | 'SOLANA' | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletError, setWalletError] = useState<string | null>(null);

  // Chain-selection dialog state (only for EVM)
  const [chainDialogOpen, setChainDialogOpen] = useState(false);
  const [balances, setBalances] = useState<Record<string, number> | null>(null);
  const [chainError, setChainError] = useState<string | null>(null);
  const [selectedChains, setSelectedChains] = useState<SupportedEvmChains[]>([]);

  // Open/close menu
  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // Menu selection
  const onTypeSelect = (type: 'EVM' | 'TRON' | 'SOLANA') => {
    setSelectedType(type);
    setWalletAddress('');
    setWalletError(null);
    setChainError(null);
    setSelectedChains([]);
    closeMenu();
    setWalletDialogOpen(true);
  };

  const closeWalletDialog = () => {
    setWalletDialogOpen(false);
  };

  const confirmWallet = async () => {
    const addr = walletAddress.trim();
    if (!addr) {
      setWalletError('Wallet address is required');
      return;
    }
    if (!isValidAddress(addr, selectedType!)) {
      setWalletError('Invalid address');
      return;
    }
    // If EVM: fetch balances and open chain dialog
    if (selectedType && selectedType !== 'TRON' && selectedType !== 'SOLANA') {
      try {
        const res = await fetch(`/api/portfolio/queryBalanceByChains?address=${addr}`);
        if (!res.ok) throw new Error(await res.text());
        const json: Record<string, number> = await res.json();
        console.log(JSON.stringify(json));
        setBalances(json);
        setWalletDialogOpen(false);
        setChainDialogOpen(true);
      } catch (err: any) {
        setWalletError(err.message || 'Failed to fetch balances');
      }
    } else {
      // TRON or SOLANA: directly call onSelect
      onSelect(selectedType!, addr);
      setWalletDialogOpen(false);
    }
  };

  const closeChainDialog = () => {
    setChainDialogOpen(false);
    setBalances(null);
  };

  const toggleChain = (chain: SupportedEvmChains) => {
    setSelectedChains((prev) =>
      prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain],
    );
    setChainError(null);
  };

  const confirmChains = () => {
    if (selectedChains.length === 0) {
      setChainError('Select at least one network');
      return;
    }
    onSelect('EVM', walletAddress.trim(), selectedChains);
    closeChainDialog();
  };

  return (
    <>
      <Button variant="contained" onClick={openMenu}>
        Add Portfolio Item
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
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

      {/* Wallet Address Dialog */}
      <Dialog open={walletDialogOpen} onClose={closeWalletDialog} fullWidth maxWidth="sm">
        <DialogTitle>Enter Wallet Address</DialogTitle>
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
              setWalletError(null);
            }}
            error={Boolean(walletError)}
            helperText={walletError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWalletDialog}>Cancel</Button>
          <Button variant="contained" onClick={confirmWallet}>
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chain Selection Dialog (EVM only) */}
      <Dialog open={chainDialogOpen} onClose={closeChainDialog} fullWidth maxWidth="sm">
        <DialogTitle>Select Networks to Track</DialogTitle>
        <DialogContent>
          {balances === null ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                py: 2,
              }}
            >
              {[...supportedEvmChainsArray]
                .sort((a, b) => (balances[b] ?? 0) - (balances[a] ?? 0))
                .map((chain) => {
                  const isSelected = selectedChains.includes(chain);
                  return (
                    <Paper
                      key={chain}
                      elevation={isSelected ? 6 : 2}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid' : '2px solid transparent',
                        borderColor: isSelected ? 'primary.main' : 'transparent',
                        '&:hover': { boxShadow: 6 },
                      }}
                      onClick={() => toggleChain(chain)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Image src={`/icons/${chain}.svg`} alt={chain} width={24} height={24} />
                        <Typography variant="subtitle1">{chainDisplayNames[chain]}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          ${balances[chain]?.toFixed(2) ?? '0.00'}
                        </Typography>
                        <Checkbox
                          checked={isSelected}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChain(chain);
                          }}
                        />
                      </Box>
                    </Paper>
                  );
                })}
            </Box>
          )}
          {chainError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {chainError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChainDialog}>Cancel</Button>
          <Button variant="contained" onClick={confirmChains}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
