// AuthContext.jsx
// Context is like a "global store" — any component can access
// the user's login info without passing it through every component

import { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the context (like creating an empty box)
const AuthContext = createContext();

// Step 2: Create the Provider (fills the box with data)
export function AuthProvider({ children }) {
  // 'token' stores the JWT token from backend after login
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // When app loads, check if user was already logged in (saved in browser)
  useEffect(() => {
    const savedToken = localStorage.getItem('sattva_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAdmin(true);
    }
  }, []); // Empty array = run only once when component mounts

  // Login function - saves token to memory and browser storage
  const login = (jwtToken) => {
    setToken(jwtToken);
    setIsAdmin(true);
    localStorage.setItem('sattva_token', jwtToken); // Persists across refreshes
  };

  // Logout function - clears everything
  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('sattva_token');
  };

  // Make these values available to ALL components
  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 3: Custom hook so components can easily use auth
// Instead of: useContext(AuthContext)
// We write: useAuth()
export function useAuth() {
  return useContext(AuthContext);
}