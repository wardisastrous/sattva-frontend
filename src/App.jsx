// App.jsx - This is the MAIN file that controls which page shows
// React Router reads the URL and shows the right page

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // For popup notifications

// Import pages (we'll create these next)
import Home from './pages/Home';
import Events from './pages/Events';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Import components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Import auth context (manages login state)
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    // AuthProvider wraps everything so any component can access login info
    <AuthProvider>
      <Router>
        {/* Toaster shows popup messages (success, error, etc.) */}
        <Toaster position="top-right" />
        
        {/* Navbar appears on ALL pages */}
        <Navbar />
        
        {/* Main content area */}
        <main>
          <Routes>
            {/* Public routes - anyone can visit */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected route - only admin can visit */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        
        {/* Footer appears on ALL pages */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;