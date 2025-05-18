import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudyGroups from './pages/StudyGroups';
import CreateGroup from './pages/CreateGroup';
import SubmitEvent from './pages/SubmitEvent';
import ApproveEvents from './pages/admin/ApproveEvents';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/study-groups" element={<StudyGroups />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/submit-event" element={<SubmitEvent />} />
            </Route>
            
            <Route element={<AdminRoute />}>
              <Route path="/admin/approve-events" element={<ApproveEvents />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;