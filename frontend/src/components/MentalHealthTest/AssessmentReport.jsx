import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress, 
  Button,
  Fade,
  Grow,
  Slide,
  useTheme
} from '@mui/material';

const SCORE_RANGES = {
  anxiety: {
    mild: { min: 0, max: 3 },
    moderate: { min: 4, max: 6 },
    severe: { min: 7, max: 9 }
  },
  depression: {
    mild: { min: 0, max: 3 },
    moderate: { min: 4, max: 6 },
    severe: { min: 7, max: 9 }
  },
  stress: {
    mild: { min: 0, max: 3 },
    moderate: { min: 4, max: 6 },
    severe: { min: 7, max: 9 }
  },
  sleep: {
    good: { min: 0, max: 3 },
    fair: { min: 4, max: 6 },
    poor: { min: 7, max: 9 }
  }
};

function AssessmentReport({ answers, onReset }) {
  const theme = useTheme();
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Calculate scores for each category
  const scores = {
    anxiety: Object.entries(answers)
      .filter(([key]) => key.startsWith('a'))
      .reduce((sum, [_, value]) => sum + value, 0),
    depression: Object.entries(answers)
      .filter(([key]) => key.startsWith('d'))
      .reduce((sum, [_, value]) => sum + value, 0),
    stress: Object.entries(answers)
      .filter(([key]) => key.startsWith('s'))
      .reduce((sum, [_, value]) => sum + value, 0),
    sleep: Object.entries(answers)
      .filter(([key]) => key.startsWith('sl'))
      .reduce((sum, [_, value]) => sum + value, 0)
  };

  // Get severity level for each category
  const getSeverity = (category, score) => {
    const ranges = SCORE_RANGES[category];
    for (const [level, range] of Object.entries(ranges)) {
      if (score >= range.min && score <= range.max) {
        return level;
      }
    }
    return 'unknown';
  };

  // Get recommendations based on scores
  const getRecommendations = () => {
    const recs = [];
    
    if (scores.anxiety > 3) {
      recs.push({
        title: 'Anxiety Management',
        description: 'Try our Anxiety Relief mode with calming frequencies and nature sounds.',
        musicSuggestion: 'Anxiety Relief preset with ocean waves'
      });
    }
    
    if (scores.depression > 3) {
      recs.push({
        title: 'Mood Enhancement',
        description: 'Our mood-lifting music can help improve your emotional state.',
        musicSuggestion: 'Uplifting melodies with binaural beats'
      });
    }
    
    if (scores.stress > 3) {
      recs.push({
        title: 'Stress Relief',
        description: 'Regular meditation with our guided sound therapy can help reduce stress.',
        musicSuggestion: 'Meditation mode with gentle rain sounds'
      });
    }
    
    if (scores.sleep > 3) {
      recs.push({
        title: 'Sleep Improvement',
        description: 'Use our Sleep mode before bedtime for better rest.',
        musicSuggestion: 'Sleep mode with delta waves'
      });
    }
    
    return recs;
  };

  return (
    <Grow in timeout={500}>
      <div>
        <Typography variant="h4" gutterBottom align="center" sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #7C3AED, #2DD4BF)'
            : 'linear-gradient(45deg, #F472B6, #FB923C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Your Assessment Results
        </Typography>

        <Box sx={{ mt: 4 }}>
          {Object.entries(scores).map(([category, score], index) => (
            <Slide
              direction="right"
              in
              timeout={300 + index * 100}
              key={category}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(score / 9) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #7C3AED, #2DD4BF)'
                        : 'linear-gradient(45deg, #F472B6, #FB923C)',
                    }
                  }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Severity: {getSeverity(category, score)}
                </Typography>
              </Box>
            </Slide>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => setShowRecommendations(true)}
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #7C3AED, #2DD4BF)'
                : 'linear-gradient(45deg, #F472B6, #FB923C)',
            }}
          >
            View Recommendations
          </Button>
          <Button
            variant="outlined"
            onClick={onReset}
            sx={{
              borderColor: theme.palette.mode === 'dark' 
                ? '#7C3AED' 
                : '#F472B6',
              color: theme.palette.mode === 'dark' 
                ? '#7C3AED' 
                : '#F472B6',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' 
                  ? '#2DD4BF' 
                  : '#FB923C',
              }
            }}
          >
            Take Test Again
          </Button>
        </Box>

        <Fade in={showRecommendations}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Personalized Recommendations
            </Typography>
            {getRecommendations().map((rec, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 2,
                  mb: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.2)'
                    : 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Typography variant="h6">{rec.title}</Typography>
                <Typography variant="body1">{rec.description}</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'primary.main' }}>
                  Suggested Music: {rec.musicSuggestion}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Fade>
      </div>
    </Grow>
  );
}

export default AssessmentReport; 