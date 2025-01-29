import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6b6b',
      dark: '#e64545',
      light: '#ff8585',
    },
    secondary: {
      main: '#ffd93d',
      dark: '#ffc107',
      light: '#ffe066',
    },
    background: {
      default: '#f5f5f5',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    gradient: {
      primary: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      secondary: 'linear-gradient(45deg, #ff8585, #ffe066)',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          backdropFilter: 'blur(10px)',
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.15), rgba(0, 183, 199, 0.15))'
            : 'linear-gradient(45deg, rgba(255, 107, 107, 0.15), rgba(255, 217, 61, 0.15))',
          '&:hover': {
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.25), rgba(0, 183, 199, 0.25))'
              : 'linear-gradient(45deg, rgba(255, 107, 107, 0.25), rgba(255, 217, 61, 0.25))',
          },
          boxShadow: theme => theme.palette.mode === 'dark'
            ? '0 2px 8px rgba(138, 43, 226, 0.15)'
            : '0 2px 8px rgba(255, 107, 107, 0.15)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
          borderTop: '1px solid rgba(255, 255, 255, 0.5)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
}); 