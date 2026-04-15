// AdminDashboard.jsx - Admin event management panel
import { useState, useEffect } from 'react';
import { getEvents, createEvent, deleteEvent, updateEvent } from '../services/api';
import { FaPlus, FaTrash, FaEdit, FaSpinner, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Toggle add event form
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await deleteEvent(id);
      setEvents(events.filter(e => e.id !== id && e._id !== id)); // Remove from UI
      toast.success('Event deleted');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-sattva-dark text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-heading">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 hover:text-sattva-gold">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-6">
            <div className="text-3xl font-bold text-sattva-green">{events.length}</div>
            <div className="text-gray-500">Total Events</div>
          </div>
          <div className="card p-6">
            <div className="text-3xl font-bold text-sattva-orange">
              {events.filter(e => new Date(e.date) > new Date()).length}
            </div>
            <div className="text-gray-500">Upcoming Events</div>
          </div>
          <div className="card p-6 col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-blue-500">
              {events.filter(e => new Date(e.date) <= new Date()).length}
            </div>
            <div className="text-gray-500">Past Events</div>
          </div>
        </div>

        {/* Add Event Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-sattva-dark">Manage Events</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus /> {showForm ? 'Cancel' : 'Add New Event'}
          </button>
        </div>

        {/* Add Event Form */}
        {showForm && (
          <EventForm 
            onSuccess={(newEvent) => {
              setEvents([newEvent, ...events]);
              setShowForm(false);
            }} 
          />
        )}

        {/* Events Table */}
        {loading ? (
          <div className="text-center py-10"><FaSpinner className="animate-spin text-3xl text-sattva-green mx-auto" /></div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-gray-600 font-medium">Event Name</th>
                  <th className="text-left p-4 text-gray-600 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-600 font-medium">Location</th>
                  <th className="text-left p-4 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id || event._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{event.name}</td>
                    <td className="p-4 text-gray-500">
                      {new Date(event.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-4 text-gray-500">{event.location}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(event.id || event._id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Delete event"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {events.length === 0 && (
              <p className="text-center text-gray-400 py-8">No events yet. Add your first event!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ ADD EVENT FORM ============
function EventForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '', date: '', location: '', description: '', category: 'Marathon'
  });
  const [image, setImage] = useState(null); // Image file
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FormData is used to send both text data AND files to backend
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('date', form.date);
    formData.append('location', form.location);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (image) formData.append('image', image); // Attach image file

    try {
      const response = await createEvent(formData);
      toast.success('Event created successfully! 🎉');
      onSuccess(response.data); // Pass new event to parent
    } catch (error) {
      toast.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-6">
      <h3 className="text-xl font-bold text-sattva-dark mb-4">Add New Event</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sattva-green focus:outline-none"
            placeholder="SATTVA City Marathon" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sattva-green focus:outline-none" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <input name="location" value={form.location} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sattva-green focus:outline-none"
            placeholder="Jalandhar, Punjab" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sattva-green focus:outline-none">
            <option>Marathon</option>
            <option>Workout</option>
            <option>Basketball</option>
            <option>Kickboxing</option>
            <option>Other</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sattva-green focus:outline-none resize-none"
            placeholder="Describe the event..." />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
            {loading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}