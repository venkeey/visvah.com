import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { UserProgressProvider } from './contexts/UserProgressContext';
import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import SimulationPage from './pages/SimulationPage';
import SimulationsPage from './pages/SimulationsPage';
import QuizPage from './pages/QuizPage';
import QuizzesPage from './pages/QuizzesPage';
import GlossaryPage from './pages/GlossaryPage';
import ProgressDashboard from './components/ProgressDashboard';
import ChartDemo from './components/ChartDemo';
import InteractiveComponentsPage from './pages/InteractiveComponentsPage';
import FAQPage from './pages/FAQPage';
import AllChaptersPage from './pages/AllChaptersPage';
import Navigation from './components/Navigation';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <UserProgressProvider>
        <Router basename="/knu">
          <div className="App">
            <Navigation />
            <SettingsPanel />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chapter/:chapterId" element={<ChapterPage />} />
                <Route path="/simulation/:simulationId" element={<SimulationPage />} />
                <Route path="/simulations" element={<SimulationsPage />} />
                <Route path="/quiz/:quizId" element={<QuizPage />} />
                <Route path="/quizzes" element={<QuizzesPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/progress" element={<ProgressDashboard />} />
                <Route path="/charts" element={<ChartDemo />} />
                <Route path="/interactive/:chapterId" element={<InteractiveComponentsPage />} />
                <Route path="/faq/:chapterId?" element={<FAQPage />} />
                <Route path="/all-chapters" element={<AllChaptersPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </UserProgressProvider>
    </SettingsProvider>
  );
}

export default App;


