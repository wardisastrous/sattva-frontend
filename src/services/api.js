// api.js - FIXED version
import axios from 'axios';

// ✅ Make sure this ends with /api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout (Render free tier can be slow)
});

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sattva_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============ EVENT APIs ============
export const getEvents = () => api.get('/events');
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (formData) => api.post('/events', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateEvent = (id, formData) => api.put(`/events/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const registerForEvent = (eventId, email) =>
  api.post(`/events/${eventId}/register`, { email });

// ============ AUTH APIs ============
export const adminLogin = (credentials) => api.post('/auth/login', credentials);

// ============ PAYMENT APIs ============
export const createPaymentOrder = (amount) =>
  api.post('/payments/create-order', { amount });
export const verifyPayment = (paymentData) =>
  api.post('/payments/verify', paymentData);

// ============ CONTACT APIs ============
export const sendContactMessage = (data) => api.post('/contact', data);

export default api;