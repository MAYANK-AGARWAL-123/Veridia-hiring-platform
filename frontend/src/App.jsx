import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import HomePage from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import CandidateDashboard from './pages/CandidateDashBoard.jsx';
import AdminDashboard from './pages/AdminDashBoard.jsx';
import JobApplicationPage from './pages/ApplicationForm.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Profile from './pages/Profile.jsx';
import AdminApplications from './pages/AdminApplications.jsx';
import ApplicationDetailPage from './pages/ApplicationDetail.jsx';

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1, py: 2 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <CandidateDashboard />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin/applications" 
            element={
              <PrivateRoute role="admin">
                <AdminApplications />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin/applications/:jobId" 
            element={
              <PrivateRoute role="admin">
                <ApplicationDetailPage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/apply/:jobId" 
            element={
              <PrivateRoute>
                <JobApplicationPage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
