'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip } from '@mui/material';

interface ThemeSwitcherProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function ThemeSwitcher({ mode, toggleTheme }: ThemeSwitcherProps) {
  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton color="inherit" onClick={toggleTheme} aria-label="theme switcher">
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
