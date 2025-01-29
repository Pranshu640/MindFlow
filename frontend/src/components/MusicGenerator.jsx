import { useState } from 'react';
import { Box, Container, Typography, Paper, TextField, Button, FormGroup, CircularProgress } from '@mui/material';
import SeamlessPlayer from './SeamlessPlayer';
import CustomCheckbox from './CustomCheckbox';
import { Slider } from '@mui/material';
import MusicControls from './MusicControls';
import NatureSounds from './NatureSounds';

function MusicGenerator() {
  const DEFAULT_PROMPT = "Generate a calm, relaxing lofi track with a slow tempo (60-80 BPM), warm jazzy chords, and soft, vinyl-crackling background noise. The melody should be smooth and minimal, featuring soft piano, Rhodes, or mellow guitar. Light hip-hop-style drums with a gentle swing should complement the track, but keep the percussion subtle and not overpowering. The overall vibe should evoke a cozy, nostalgic, and peaceful atmosphere, perfect for studying, chilling, or unwinding. Use soft reverb and gentle tape saturation to enhance the warmth.";

  const MOOD_PRESETS = {
    focus: {
      name: "Focus & Concentration",
      prompt: "Create a minimal, ambient track with gentle rhythms and clear textures. Include soft binaural beats at 40Hz for enhanced focus. Use subtle piano melodies and light atmospheric sounds that help maintain concentration without being distracting.",
      icon: "🎯",
    },
    relax: {
      name: "Relaxation & Calm",
      prompt: "Generate a soothing, peaceful track with warm pad sounds and gentle waves. Include nature sounds like soft rainfall and distant birds. The tempo should be very slow (around 60 BPM) with minimal percussion.",
      icon: "🌊",
    },
    sleep: {
      name: "Sleep & Rest",
      prompt: "Create a very gentle ambient track with extremely soft dynamics. Include delta wave frequencies (0.5-4Hz) and use minimal melodic elements. The sound should be consistently peaceful with no sudden changes.",
      icon: "🌙",
    },
    meditate: {
      name: "Meditation",
      prompt: "Generate a deep, spiritual ambient track with 432Hz tuning. Include subtle singing bowls, soft drone sounds, and occasional wind chimes. The piece should evolve very slowly with long, peaceful phrases.",
      icon: "🧘",
    },
    anxiety: {
      name: "Anxiety Relief",
      prompt: "Create a grounding, calming track with gentle rhythmic elements at 60 BPM to match resting heart rate. Include soft ocean waves and incorporate 396Hz solfeggio frequency for reducing anxiety.",
      icon: "🍃",
    },
  };

  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    prompt: '',
    elements: {
      synth: {
        level: 50,
        type: 'warm', // warm, digital, atmospheric
      },
      beats: {
        level: 50,
        type: 'lofi', // lofi, ambient, none
      },
      binauralFrequency: {
        level: 0,
        frequency: 432, // 432Hz, 528Hz, 639Hz
      },
      atmosphere: {
        level: 30,
        type: 'rain', // rain, waves, forest
      },
      melody: {
        level: 70,
        complexity: 50,
      },
    },
    duration: 30,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const finalPrompt = selectedMood 
        ? MOOD_PRESETS[selectedMood].prompt 
        : (settings.prompt.trim() === '' ? DEFAULT_PROMPT : settings.prompt);
      
      console.log('Sending request with settings:', settings);
      
      const response = await fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          prompt: finalPrompt,
        }),
      });

      console.log('Response status:', response.status);
      const contentType = response.headers.get('content-type');
      console.log('Response content-type:', contentType);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.error || 'Generation failed');
      }

      const blob = await response.blob();
      console.log('Received blob:', blob);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: 3,
        background: theme => theme.palette.mode === 'dark' 
          ? 'rgba(0, 0, 0, 0.6)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: theme => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: theme => theme.palette.mode === 'dark'
          ? '0 4px 30px rgba(0, 0, 0, 0.1)'
          : '0 4px 30px rgba(255, 107, 107, 0.1)',
      }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ /* ... */ }}>
          AI Music Generator
        </Typography>

        <Box
          sx={{
            mt: 2,
            px: 3,
            maxWidth: 1200,
            mx: 'auto',
            width: '100%',
          }}
        >
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto',
            gap: 3,
          }}>
            {/* Main Controls Section */}
            <Paper
              sx={{
                gridColumn: { xs: '1 / -1', md: '1 / 9' },
                p: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                background: theme => theme.palette.mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: theme => theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 107, 107, 0.1)',
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? 'none'
                  : '0 4px 20px rgba(255, 107, 107, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme => theme.palette.mode === 'dark'
                    ? 'none'
                    : '0 6px 25px rgba(255, 107, 107, 0.08)',
                },
              }}
            >
              {/* Mood Presets */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                gap: 2,
              }}>
                {Object.entries(MOOD_PRESETS).map(([key, preset]) => (
                  <Button
                    key={key}
                    variant={selectedMood === key ? "contained" : "outlined"}
                    onClick={() => setSelectedMood(key)}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      background: theme => selectedMood === key 
                        ? theme.palette.mode === 'dark'
                          ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.8), rgba(0, 255, 255, 0.8))'
                          : 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 217, 61, 0.8))'
                        : 'transparent',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    <Typography variant="h3" sx={{ mb: 1 }}>{preset.icon}</Typography>
                    <Typography variant="subtitle1">{preset.name}</Typography>
                  </Button>
                ))}
              </Box>

              {/* Prompt Text Field */}
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Customize your music (optional)"
                placeholder="Enter your own music description or leave empty for default style"
                value={settings.prompt}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  prompt: e.target.value
                }))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme => theme.palette.mode === 'dark' 
                      ? 'rgba(0, 0, 0, 0.2)'
                      : 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme => theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 107, 107, 0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme => theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(255, 107, 107, 0.3)',
                  },
                }}
              />

              {/* Generate Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleGenerate}
                disabled={isLoading}
                sx={{ 
                  height: 48,
                  mt: 1,
                  background: theme => theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.8), rgba(0, 255, 255, 0.8))'
                    : 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 217, 61, 0.8))',
                  '&:hover': {
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, rgba(138, 43, 226, 1), rgba(0, 255, 255, 1))'
                      : 'linear-gradient(45deg, rgba(255, 107, 107, 1), rgba(255, 217, 61, 1))',
                  }
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Generate Music'}
              </Button>
            </Paper>

            {/* Nature Sounds Section */}
            <Paper
              sx={{
                gridColumn: { xs: '1 / -1', md: '9 / -1' },
                p: 3,
                borderRadius: 2,
                background: theme => theme.palette.mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: theme => theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 217, 61, 0.1)',
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? 'none'
                  : '0 4px 20px rgba(255, 217, 61, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme => theme.palette.mode === 'dark'
                    ? 'none'
                    : '0 6px 25px rgba(255, 217, 61, 0.08)',
                },
              }}
            >
              <NatureSounds />
            </Paper>

            {/* Advanced Controls Section */}
            <Paper
              sx={{
                gridColumn: '1 / -1',
                p: 3,
                borderRadius: 2,
                display: showAdvanced ? 'block' : 'none',
                background: theme => theme.palette.mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: theme => theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 107, 107, 0.05)',
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? 'none'
                  : '0 4px 20px rgba(255, 107, 107, 0.03)',
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2,
              }}>
                <Typography variant="h6">Advanced Controls</Typography>
                <Button
                  variant="text"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  Hide Advanced Controls
                </Button>
              </Box>
              <MusicControls 
                settings={settings}
                onSettingsChange={setSettings}
              />
            </Paper>

            {/* Audio Player Section */}
            {audioUrl && (
              <Paper 
                sx={{
                  gridColumn: '1 / -1',
                  p: 3,
                  borderRadius: 2,
                  background: theme => theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: theme => theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(255, 107, 107, 0.1)',
                  boxShadow: theme => theme.palette.mode === 'dark'
                    ? 'none'
                    : '0 4px 20px rgba(255, 107, 107, 0.05)',
                }}
              >
                <SeamlessPlayer url={audioUrl} />
              </Paper>
            )}

            {/* Show Advanced Controls Button */}
            {!showAdvanced && (
              <Button
                variant="text"
                onClick={() => setShowAdvanced(true)}
                sx={{ 
                  gridColumn: '1 / -1',
                  background: theme => theme.palette.mode === 'dark'
                    ? 'rgba(138, 43, 226, 0.1)'
                    : 'rgba(255, 107, 107, 0.05)',
                  borderRadius: 2,
                  py: 1.5,
                  '&:hover': {
                    background: theme => theme.palette.mode === 'dark'
                      ? 'rgba(138, 43, 226, 0.2)'
                      : 'rgba(255, 107, 107, 0.1)',
                  }
                }}
              >
                Show Advanced Controls
              </Button>
            )}
          </Box>

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default MusicGenerator; 