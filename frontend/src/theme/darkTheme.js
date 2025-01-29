import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8a2be2',
    },
    secondary: {
      main: '#00ffff',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(18, 18, 18, 0.8)',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.2), rgba(0, 255, 255, 0.2))',
          '&:hover': {
            background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.4), rgba(0, 255, 255, 0.4))',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(to bottom right, rgba(18, 18, 18, 0.8), rgba(28, 28, 28, 0.8))',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
}); 