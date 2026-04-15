// Navbar.jsx - Navigation bar shown on every page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes, FaLeaf } from 'react-icons/fa'; // Icons
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile menu open/close
  const { isAdmin, logout } = useAuth(); // Get auth info from context
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-sattva-dark text-white sticky top-0 z-50 shadow-lg">
      {/* sticky top-0 = stays at top when scrolling */}
      {/* z-50 = appears above other elements */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <FaLeaf className="text-sattva-light" />
            <span className="font-heading">SATTVA</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* hidden md:flex = hidden on mobile, visible on medium+ screens */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/donate">Donate</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            
            {/* Show different options based on login status */}
            {isAdmin ? (
              <div className="flex items-center gap-4">
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <button 
                  onClick={handleLogout}
                  className="btn-primary text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/admin/login" className="btn-primary text-sm">
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (hamburger icon) */}
          <button 
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-sattva-green px-4 pb-4 flex flex-col gap-3">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/events" onClick={() => setIsOpen(false)}>Events</MobileNavLink>
          <MobileNavLink to="/donate" onClick={() => setIsOpen(false)}>Donate</MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          {isAdmin ? (
            <>
              <MobileNavLink to="/admin/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
              <button onClick={handleLogout} className="text-left text-white font-medium">Logout</button>
            </>
          ) : (
            <MobileNavLink to="/admin/login" onClick={() => setIsOpen(false)}>Admin Login</MobileNavLink>
          )}
        </div>
      )}
    </nav>
  );
}

// Small reusable components for nav links
function NavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="text-gray-200 hover:text-sattva-gold font-medium transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="text-white font-medium py-2 border-b border-sattva-dark"
    >
      {children}
    </Link>
  );
}