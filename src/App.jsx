import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './Pages/auth';
import CareerAssessmentFlow from './Pages/init_step';
import LandingPage from './Pages/landing_page';
import CareerRecommendationDashboard from './Pages/carrer_recomend';
import ResumeBuilderDashboard from './Pages/resume_build';
import InterviewSessionUI from './Pages/interview';
import AudioCaptureUI from './Pages/audio_capture';
import AudioVideoCaptureUI from './Pages/audio_capture';
import Dashboard from './Pages/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Career Assessment Flow */}
        <Route path="/setup" element={<CareerAssessmentFlow />} />

        {/* Career Recommendation Dashboard */}
        <Route path="/setup-results" element={<CareerRecommendationDashboard />} />

        {/* Resume Builder - Placeholder for future implementation */}
        {/* <Route path="/build-resume" element={<ResumeBuilderDashboard />} /> */}

        <Route path="/interview" element={<InterviewSessionUI />} />

        <Route path="/audio" element={<AudioVideoCaptureUI />} />
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
