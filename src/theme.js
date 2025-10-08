import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Electric Blue
    },
    secondary: {
      main: '#00C4CC', // Vibrant Cyan
    },
    background: {
      default: '#2C2C2E',//dark charcoal grey
      paper: '#1E1E1E',
    },
    text: {
      primary: '#EDEDED',
      secondary: '#A0A0A0',
    },
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#22C55E',
    },
    warning: {
      main: '#FACC15',
    },
    divider: '#2E2E2E',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;