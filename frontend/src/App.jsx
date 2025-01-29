import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { darkTheme } from './theme/darkTheme';
import { lightTheme } from './theme/lightTheme';
import MusicGenerator from './components/MusicGenerator';
import BreathingBackground from './components/BreathingBackground';
import ThemeToggle from './components/ThemeToggle';
import Navigation from './components/Navigation';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Assessment from './pages/Assessment';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);  // Set light mode as default
  
  const toggleTheme = () => {
    console.log('Toggle clicked, current mode:', isDarkMode); // Debug log
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <BreathingBackground isDark={isDarkMode} />
        <Router>
          <Navigation />
          <ThemeToggle 
            isDark={isDarkMode} 
            onToggle={toggleTheme}
            sx={{ zIndex: 1200 }} // Ensure button is clickable
          />
          <Box sx={{ 
            mt: '100px', // Add margin top to account for fixed navbar
            flex: 1,
            position: 'relative',
            zIndex: 1
          }}>
            <Routes>
              <Route path="/" element={<Navigate to="/music" replace />} />
              <Route path="/music" element={<MusicGenerator />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/assessment" element={<Assessment />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
