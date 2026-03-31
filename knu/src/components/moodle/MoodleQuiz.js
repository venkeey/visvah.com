import React from 'react';
import { ContentSection } from './MoodleStyles';

const MoodleQuiz = ({ theme, quizQuestions, quizAnswers, setQuizAnswers }) => {
  const score = Object.keys(quizAnswers).filter(
    qId => quizAnswers[qId] === quizQuestions.find(q => q.id === parseInt(qId))?.correct
  ).length;

  return (
    <ContentSection theme={theme}>
      <h2>❓ Knowledge Check Quiz</h2>
      <p>Test your understanding of tokenomics case studies with these interactive questions.</p>

      <div style={{ marginTop: '25px' }}>
        {quizQuestions.map((question, index) => {
          const answered = quizAnswers[question.id];
          return (
            <div key={question.id} style={{
              background: theme === 'dark' ? 'rgba(55, 65, 81, 0.6)' : 'rgba(247, 250, 252, 0.8)',
              padding: '25px', borderRadius: '12px', marginBottom: '25px',
              border: `2px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'}`
            }}>
              <h4 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '15px' }}>
                Question {index + 1}: {question.question}
              </h4>
              <div style={{ marginBottom: '20px' }}>
                {question.options.map((option, optionIndex) => {
                  const isSelected = answered === optionIndex;
                  const isCorrect = isSelected && answered === question.correct;
                  return (
                    <div key={optionIndex} style={{ marginBottom: '10px' }}>
                      <label style={{
                        display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', borderRadius: '8px',
                        background: isSelected ? (isCorrect ? '#10b981' : '#ef4444') : 'transparent',
                        border: `2px solid ${isSelected ? (isCorrect ? '#10b981' : '#ef4444') : theme === 'dark' ? '#4a5568' : '#e2e8f0'}`
                      }}>
                        <input type="radio" name={`question-${question.id}`} value={optionIndex}
                          checked={isSelected}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [question.id]: optionIndex })}
                          style={{ marginRight: '10px' }}
                        />
                        {option}
                        {isSelected && <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{isCorrect ? '✅' : '❌'}</span>}
                      </label>
                    </div>
                  );
                })}
              </div>
              {answered !== undefined && (
                <div style={{
                  padding: '15px',
                  background: answered === question.correct ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  border: `1px solid ${answered === question.correct ? '#10b981' : '#ef4444'}`,
                  borderRadius: '8px',
                  color: answered === question.correct ? '#10b981' : '#ef4444'
                }}>
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ textAlign: 'center', padding: '20px', background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', borderRadius: '12px', marginTop: '30px' }}>
          <h4 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '15px' }}>Quiz Results</h4>
          <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Score: {score} / {quizQuestions.length}</div>
          <button
            onClick={() => setQuizAnswers({})}
            style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Reset Quiz
          </button>
        </div>
      </div>
    </ContentSection>
  );
};

export default MoodleQuiz;
