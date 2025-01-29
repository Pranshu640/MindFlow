import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: 24,
  },
  '&.MuiCheckbox-root': {
    color: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.3)'
      : 'rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(138, 43, 226, 0.1)',
    },
  },
  '&.Mui-checked': {
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 4px rgba(138, 43, 226, 0.5))',
    '& .MuiSvgIcon-root': {
      animation: 'pulse 1.5s infinite ease-in-out',
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      filter: 'brightness(1)',
    },
    '50%': {
      transform: 'scale(1.05)',
      filter: 'brightness(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
      filter: 'brightness(1)',
    },
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.7)',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
  },
  '&:hover .MuiFormControlLabel-label': {
    color: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(0, 0, 0, 0.9)',
  },
  '&:has(input:checked) .MuiFormControlLabel-label': {
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 8px rgba(138, 43, 226, 0.3)',
  },
}));

function CustomCheckbox({ label, checked, onChange, ...props }) {
  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox 
          checked={checked}
          onChange={onChange}
          {...props}
        />
      }
      label={label}
    />
  );
}

export default CustomCheckbox; 