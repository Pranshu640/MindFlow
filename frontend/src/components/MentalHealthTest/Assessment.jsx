import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Radio, 
  RadioGroup,
  FormControlLabel, 
  FormControl, 
  Button,
  useTheme
} from '@mui/material';
import AssessmentReport from './AssessmentReport';

const QUESTIONS = {
  anxiety: [
    {
      id: 'a1',
      question: 'How often do you feel nervous, anxious, or on edge?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'a2',
      question: 'How often do you have trouble relaxing?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'a3',
      question: 'How often do you feel restless or have difficulty sitting still?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    }
  ],
  depression: [
    {
      id: 'd1',
      question: 'How often do you feel down, depressed, or hopeless?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'd2',
      question: 'How often do you have little interest or pleasure in doing things?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'd3',
      question: 'How often do you feel tired or have little energy?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    }
  ],
  stress: [
    {
      id: 's1',
      question: 'How often do you feel overwhelmed by your responsibilities?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 's2',
      question: 'How often do you have difficulty concentrating?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 's3',
      question: 'How often do you experience physical symptoms of stress (headaches, tension)?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    }
  ],
  sleep: [
    {
      id: 'sl1',
      question: 'How would you rate your overall sleep quality?',
      options: [
        { value: 0, label: 'Very good' },
        { value: 1, label: 'Fairly good' },
        { value: 2, label: 'Fairly bad' },
        { value: 3, label: 'Very bad' }
      ]
    },
    {
      id: 'sl2',
      question: 'How often do you have trouble falling asleep?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'sl3',
      question: 'How often do you wake up during the night?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    }
  ]
};

function Assessment() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReport, setShowReport] = useState(false);

  const categories = Object.keys(QUESTIONS);
  const currentCategory = categories[activeStep];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: Number(value)
    }));
  };

  const handleNext = () => {
    if (activeStep === categories.length - 1) {
      generateReport();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const generateReport = () => {
    setShowReport(true);
  };

  const isStepComplete = () => {
    const currentQuestions = QUESTIONS[currentCategory];
    return currentQuestions.every(q => answers[q.id] !== undefined);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 2,
        p: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme => theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'inherit',
          zIndex: -1,
        },
        background: theme.palette.mode === 'dark'
          ? 'transparent'
          : 'transparent',
        borderRadius: 2,
        zIndex: 1,
      }}
    >
      {!showReport ? (
        <>
          <Typography variant="h4" gutterBottom align="center" sx={{
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #7C3AED, #2DD4BF)'
              : 'linear-gradient(45deg, #F472B6, #FB923C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            MindFlow Assessment
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {categories.map((label) => (
              <Step key={label}>
                <StepLabel>{label.charAt(0).toUpperCase() + label.slice(1)}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box>
            {QUESTIONS[currentCategory].map((q) => (
              <FormControl key={q.id} sx={{ mb: 3, width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {q.question}
                </Typography>
                <RadioGroup
                  value={answers[q.id] ?? ''}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                >
                  {q.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio checked={answers[q.id] === option.value} />}
                      label={option.label}
                      sx={{
                        '& .MuiRadio-root': {
                          color: theme.palette.mode === 'dark' 
                            ? '#7C3AED' 
                            : '#F472B6'
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
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
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              variant="contained"
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #7C3AED, #2DD4BF)'
                  : 'linear-gradient(45deg, #F472B6, #FB923C)',
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #2DD4BF, #7C3AED)'
                    : 'linear-gradient(45deg, #FB923C, #F472B6)',
                }
              }}
            >
              {activeStep === categories.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      ) : (
        <AssessmentReport 
          answers={answers} 
          onReset={() => {
            setShowReport(false);
            setActiveStep(0);
            setAnswers({});
          }}
        />
      )}
    </Paper>
  );
}

export default Assessment; 