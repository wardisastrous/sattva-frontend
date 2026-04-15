// AdminLogin.jsx - Secure admin login page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaLock, FaUser, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Update the right field (username or password) when user types
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await adminLogin(credentials);
      const { token } = response.data; // JWT token from backend
      login(token); // Save to context + localStorage
      toast.success('Welcome back, Admin! 👋');
      navigate('/admin/dashboard'); // Redirect to dashboard
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sattva-dark flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-sattva-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLeaf className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-sattva-dark font-heading">SATTVA Admin</h1>
          <p className="text-gray-500 mt-2">Secure admin portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaLock />}
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}