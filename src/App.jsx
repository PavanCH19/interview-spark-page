import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Page Imports
import LandingPage from './Pages/landing_page';
import AuthPage from './Pages/auth';
import Dashboard from './Pages/dashboard';
import CareerAssessmentFlow from './Pages/init_step';
import CareerRecommendationDashboard from './Pages/carrer_recomend';
import ResumeBuilderDashboard from './Pages/resume_build';
import InterviewSessionUI from './Pages/interview';
import AudioVideoCaptureUI from './Pages/audio_capture';
import { Notification } from './components/Notifications';

// Fixed Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const [redirect, setRedirect] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       setShowNotification(true);

//       // Wait 2 seconds before redirect
//       const timer = setTimeout(() => {
//         setRedirect(true);
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [token]);

//   if (!token) {
//     if (redirect) {
//       return <Navigate to="/auth" replace />;
//     }

//     return (
//       <>
//         {showNotification && (
//           <Notification
//             message="Please log in to access this page."
//             type="error"
//             duration={2000}
//             onClose={() => setShowNotification(false)}
//           />
//         )}
//       </>
//     );
//   }

//   return children;
// };

// import jwt_decode from 'jwt-decode'; // npm install jwt-decode

const ProtectedRoute = ({ children }) => {
  const [redirect, setRedirect] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const token = localStorage.getItem('token');

  // Helper to decode JWT payload without external lib
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp && payload.exp > currentTime;
    } catch (e) {
      console.error('Invalid token', e);
      return false;
    }
  };

  useEffect(() => {
    if (!isTokenValid(token)) {
      setShowNotification(true);

      const timer = setTimeout(() => {
        localStorage.removeItem('token'); // remove expired token
        setRedirect(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [token]);

  if (!token || !isTokenValid(token) || redirect) {
    if (redirect) return <Navigate to="/auth" replace />;

    return (
      <>
        {showNotification && (
          <Notification
            message="Session expired. Please log in again."
            type="error"
            duration={2000}
            onClose={() => setShowNotification(false)}
          />
        )}
      </>
    );
  }

  return children;
};


// Route Layout
function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <CareerAssessmentFlow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup-results"
          element={
            <ProtectedRoute>
              <CareerRecommendationDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/build-resume"
          element={
            <ProtectedRoute>
              <ResumeBuilderDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewSessionUI />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audio"
          element={
            <ProtectedRoute>
              <AudioVideoCaptureUI />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
