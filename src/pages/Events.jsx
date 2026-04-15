// Events.jsx - Shows all events from the database
import { useState, useEffect } from 'react';
import { getEvents, registerForEvent } from '../services/api';
import { FaCalendar, FaMapMarkerAlt, FaEnvelope, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Events() {
  const [events, setEvents] = useState([]); // Stores events from database
  const [loading, setLoading] = useState(true); // Shows spinner while loading
  const [selectedEvent, setSelectedEvent] = useState(null); // For registration modal

  // Fetch events when page loads
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      // If backend isn't running yet, show sample data
      console.log('Backend not connected, showing sample data');
      setEvents(sampleEvents);
    } finally {
      setLoading(false); // Always stop loading spinner
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-sattva-green text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div 
        className="bg-sattva-dark text-white py-20 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(27,67,50,0.95), rgba(45,106,79,0.9)), url("https://images.unsplash.com/photo-1526676037777-05a232554f77?w=1600") center/cover'
        }}
      >
        <h1 className="text-5xl font-bold font-heading mb-4">Our Events</h1>
        <p className="text-gray-200 text-lg max-w-xl mx-auto">
          Join us in our mission to promote fitness and support athletes across India.
        </p>
      </div>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {events.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">No events scheduled yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard 
                key={event.id || event._id} 
                event={event}
                onRegister={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <RegistrationModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

// ============ EVENT CARD ============
function EventCard({ event, onRegister }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="card group">
      {/* Event Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={event.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category badge */}
        <span className="absolute top-3 right-3 bg-sattva-green text-white text-xs px-3 py-1 rounded-full font-medium">
          {event.category || 'Fitness'}
        </span>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-sattva-dark mb-3">{event.name}</h3>
        
        <div className="space-y-2 mb-4">
          <p className="flex items-center gap-2 text-gray-500 text-sm">
            <FaCalendar className="text-sattva-green flex-shrink-0" />
            {formatDate(event.date)}
          </p>
          <p className="flex items-center gap-2 text-gray-500 text-sm">
            <FaMapMarkerAlt className="text-sattva-green flex-shrink-0" />
            {event.location}
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-3">
          {event.description}
          {/* line-clamp-3 = shows max 3 lines, then ... */}
        </p>

        <button 
          onClick={onRegister}
          className="w-full btn-primary text-sm"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}

// ============ REGISTRATION MODAL ============
function RegistrationModal({ event, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      await registerForEvent(event.id || event._id, email);
      toast.success(`Successfully registered for ${event.name}! 🎉`);
      onClose();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop (dark overlay behind modal)
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()} // Close on backdrop click
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h3 className="text-2xl font-bold text-sattva-dark mb-2">Register for Event</h3>
        <p className="text-sattva-green font-medium mb-6">{event.name}</p>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            {loading ? <FaSpinner className="animate-spin" /> : null}
            {loading ? 'Registering...' : 'Confirm Registration'}
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Sample data to show while backend isn't connected yet
const sampleEvents = [
  {
    id: '1',
    name: 'SATTVA City Marathon',
    date: '2025-06-01',
    location: 'Jalandhar, Punjab',
    description: 'A city-wide marathon promoting fitness and unity. Open for all ages.',
    category: 'Marathon',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600'
  },
  {
    id: '2',
    name: 'Community Workout Session',
    date: '2025-05-15',
    location: 'Ludhiana, Punjab',
    description: 'A free group workout session in the city park. All fitness levels welcome.',
    category: 'Workout',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'
  },
  {
    id: '3',
    name: 'Basketball Championship',
    date: '2025-07-10',
    location: 'Amritsar, Punjab',
    description: 'Annual basketball tournament. Teams from across Punjab compete.',
    category: 'Basketball',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600'
  }
];