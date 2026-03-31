import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import quizzesData from '../data/quizzesData.js';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const QuizTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 15px;
`;

const QuizDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 4px;
  overflow: hidden;
  margin: 20px 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const QuestionCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 25px;
  line-height: 1.6;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OptionButton = styled.button`
  background: ${props => {
    if (props.selected && props.correct) return '#48bb78';
    if (props.selected && !props.correct) return '#f56565';
    if (props.showAnswer && props.correct) return '#48bb78';
    return props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)';
  }};
  color: ${props => {
    if (props.selected || (props.showAnswer && props.correct)) return 'white';
    return props.theme === 'dark' ? '#e2e8f0' : '#2d3748';
  }};
  border: 2px solid ${props => {
    if (props.selected && props.correct) return '#48bb78';
    if (props.selected && !props.correct) return '#f56565';
    if (props.showAnswer && props.correct) return '#48bb78';
    return props.theme === 'dark' ? '#4a5568' : '#e2e8f0';
  }};
  padding: 20px;
  border-radius: 12px;
  font-size: 1rem;
  text-align: left;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  font-weight: ${props => props.selected ? '600' : '400'};

  &:hover {
    ${props => !props.disabled && `
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    `}
  }

  &:disabled {
    opacity: 0.8;
  }
`;

const Explanation = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.3)' : 'rgba(102, 126, 234, 0.3)'};
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  color: ${props => props.theme === 'dark' ? '#90cdf4' : '#4c51bf'};
  font-style: italic;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
`;

const NavButton = styled.button`
  background: ${props => props.theme === 'dark'
    ? (props.variant === 'primary' ? 'linear-gradient(135deg, #4a5568, #2d3748)' : 'transparent')
    : (props.variant === 'primary' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent')};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme === 'dark' ? '#90cdf4' : '#4c51bf'};
  border: 2px solid ${props => props.variant === 'primary' ? 'transparent' : props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  padding: 15px 30px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ScoreDisplay = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin: 20px 0;
`;

const ScoreText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 30px;
`;

const QuizPage = () => {
  const { quizId } = useParams();
  const { darkMode } = useSettings();
  const { completeQuiz, getQuizProgress } = useUserProgress();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const foundQuiz = quizzesData.find(q => q.id === quizId);
    setQuiz(foundQuiz);
    
    // Start tracking quiz time
    setStartTime(Date.now());
    
    // Check if quiz is already completed
    const progress = getQuizProgress(quizId);
    if (progress.completed) {
      setQuizCompleted(true);
      setScore(progress.bestScore);
    }
  }, [quizId, getQuizProgress]);

  // Scroll to top when quiz changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [quizId]);

  useEffect(() => {
    if (quiz && Object.keys(selectedAnswers).length === quiz.questions.length) {
      calculateScore();
    }
  }, [selectedAnswers, quiz]);

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showAnswers) return; // Don't allow changing answers after submission
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswers(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswers(false);
    }
  };

  const handleSubmitQuiz = () => {
    setShowAnswers(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowAnswers(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (!quiz) {
    return (
      <QuizContainer>
        <QuizHeader theme={darkMode ? 'dark' : 'light'}>
          <QuizTitle theme={darkMode ? 'dark' : 'light'}>Quiz Not Found</QuizTitle>
          <QuizDescription theme={darkMode ? 'dark' : 'light'}>
            The requested quiz could not be found.
          </QuizDescription>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <NavButton theme={darkMode ? 'dark' : 'light'}>
              Return to Home
            </NavButton>
          </Link>
        </QuizHeader>
      </QuizContainer>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const allQuestionsAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    // Track quiz completion if not already tracked
    if (startTime && !getQuizProgress(quizId).completed) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
      completeQuiz(quizId, percentage);
    }
    
    const getScoreMessage = () => {
      if (percentage >= 90) return "Excellent! You're a tokenomics expert! 🎉";
      if (percentage >= 80) return "Great job! You have a solid understanding! 👍";
      if (percentage >= 70) return "Good work! Keep learning and improving! 📚";
      if (percentage >= 60) return "Not bad! Review the material and try again! 🔄";
      return "Keep studying! You'll get better with practice! 💪";
    };

    return (
      <QuizContainer>
        <ResultsCard theme={darkMode ? 'dark' : 'light'}>
          <QuizTitle theme={darkMode ? 'dark' : 'light'}>Quiz Complete!</QuizTitle>
          <ScoreDisplay theme={darkMode ? 'dark' : 'light'}>
            {score}/{quiz.questions.length}
          </ScoreDisplay>
          <ScoreText theme={darkMode ? 'dark' : 'light'}>
            {percentage}% - {getScoreMessage()}
          </ScoreText>
          <NavigationButtons>
            <NavButton 
              onClick={handleRestartQuiz}
              theme={darkMode ? 'dark' : 'light'}
              variant="primary"
            >
              🔄 Retake Quiz
            </NavButton>
            <Link to="/" style={{ textDecoration: 'none', flex: 1 }}>
              <NavButton theme={darkMode ? 'dark' : 'light'}>
                🏠 Back to Home
              </NavButton>
            </Link>
          </NavigationButtons>
        </ResultsCard>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizHeader theme={darkMode ? 'dark' : 'light'}>
        <QuizTitle theme={darkMode ? 'dark' : 'light'}>{quiz.title}</QuizTitle>
        <QuizDescription theme={darkMode ? 'dark' : 'light'}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </QuizDescription>
        <ProgressBar theme={darkMode ? 'dark' : 'light'}>
          <ProgressFill progress={progress} />
        </ProgressBar>
      </QuizHeader>

      <QuestionCard theme={darkMode ? 'dark' : 'light'}>
        <QuestionText theme={darkMode ? 'dark' : 'light'}>
          {currentQuestion.question}
        </QuestionText>

        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleAnswerSelect(index)}
              selected={selectedAnswers[currentQuestionIndex] === index}
              correct={index === currentQuestion.correct}
              showAnswer={showAnswers}
              disabled={showAnswers}
              theme={darkMode ? 'dark' : 'light'}
            >
              {String.fromCharCode(65 + index)}. {option}
            </OptionButton>
          ))}
        </OptionsContainer>

        {showAnswers && (
          <Explanation theme={darkMode ? 'dark' : 'light'}>
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </Explanation>
        )}

        <NavigationButtons>
          <NavButton
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            theme={darkMode ? 'dark' : 'light'}
          >
            ← Previous
          </NavButton>

          {!showAnswers ? (
            <NavButton
              onClick={handleSubmitQuiz}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              theme={darkMode ? 'dark' : 'light'}
              variant="primary"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Submit Answer'}
            </NavButton>
          ) : (
            <NavButton
              onClick={handleNextQuestion}
              theme={darkMode ? 'dark' : 'light'}
              variant="primary"
            >
              {isLastQuestion ? 'See Results' : 'Next Question'}
            </NavButton>
          )}
        </NavigationButtons>
      </QuestionCard>
    </QuizContainer>
  );
};

export default QuizPage;



