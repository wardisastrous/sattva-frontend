// ProtectedRoute.jsx
// This "guard" checks if user is logged in before showing admin pages
// If not logged in, redirects to login page

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, show the actual page
  return children;
}