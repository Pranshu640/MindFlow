import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <AppBar position="static" sx={{ background: 'transparent', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        {/* Remove or comment out the Mindflow branding */}
        {/* <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          MeloMind
        </Typography> */}
        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/chat">
            Chat
          </Button>
          <Button color="inherit" component={Link} to="/assessment">
            Assessment
          </Button>
          <Button color="inherit" component={Link} to="/music">
            Music
          </Button>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 