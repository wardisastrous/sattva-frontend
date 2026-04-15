// Contact.jsx
import { useState } from 'react';
import { sendContactMessage } from '../services/api';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactMessage(form);
      toast.success('Message sent! We\'ll get back to you soon. 📬');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, title: 'Address', value: 'Jalandhar, Punjab, India' },
    { icon: <FaPhone />, title: 'Phone', value: '+91 98772 42079' },
    { icon: <FaEnvelope />, title: 'Email', value: 'ngosattva@gmail.com' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-sattva-dark text-white py-20 text-center">
        <h1 className="text-5xl font-bold font-heading mb-4">Contact Us</h1>
        <p className="text-gray-200 text-lg">We'd love to hear from you. Reach out anytime!</p>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="text-sattva-green text-3xl flex justify-center mb-3">{info.icon}</div>
              <h3 className="font-semibold text-gray-700 mb-1">{info.title}</h3>
              <p className="text-gray-500">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="card p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-sattva-dark mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
                  placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input name="subject" value={form.subject} onChange={handleChange} required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
                placeholder="How can we help?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows="5"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green resize-none"
                placeholder="Write your message here..." />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-4 flex items-center justify-center gap-2">
              {loading ? <FaSpinner className="animate-spin" /> : null}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}