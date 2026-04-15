// api.js
// This file centralizes ALL API calls to our backend
// Instead of writing the full URL everywhere, we write it once here

import axios from 'axios';

// Base URL of our backend (change this when we deploy)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create an axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Automatically adds JWT token to every request
// Think of it like a security badge that gets attached to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sattva_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // "Bearer" is the JWT standard
  }
  return config;
});

// ============ EVENT APIs ============

// Get all events from database
export const getEvents = () => api.get('/events');

// Get single event by ID
export const getEventById = (id) => api.get(`/events/${id}`);

// Create new event (admin only)
export const createEvent = (formData) => api.post('/events', formData, {
  headers: { 'Content-Type': 'multipart/form-data' } // For file upload
});

// Update event (admin only)
export const updateEvent = (id, formData) => api.put(`/events/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Delete event (admin only)
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Register for an event
export const registerForEvent = (eventId, email) => 
  api.post(`/events/${eventId}/register`, { email });

// ============ AUTH APIs ============

// Admin login
export const adminLogin = (credentials) => api.post('/auth/login', credentials);

// ============ PAYMENT APIs ============

// Create Razorpay order
export const createPaymentOrder = (amount) => 
  api.post('/payments/create-order', { amount });

// Verify payment after success
export const verifyPayment = (paymentData) => 
  api.post('/payments/verify', paymentData);

// ============ CONTACT APIs ============

// Send contact message
export const sendContactMessage = (data) => api.post('/contact', data);

export default api;