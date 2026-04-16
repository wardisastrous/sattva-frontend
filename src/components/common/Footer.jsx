// Footer.jsx - Bottom section of every page
import { Link } from 'react-router-dom';
import { FaLeaf, FaInstagram, FaFacebook, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-sattva-dark text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top section with 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-sattva-light text-xl" />
              <span className="text-white text-xl font-bold font-heading">SATTVA</span>
            </div>
            <p className="text-sm leading-relaxed">
              A fitness-based social organization dedicated to promoting personal 
              fitness awareness and supporting underprivileged athletes across India.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4">
              <a 
    href="https://www.instagram.com/sattva.foundation.26?igsh=MXg2eWYyaXVrNnIybA==" 
    target="_blank"          
    rel="noopener noreferrer"
    className="hover:text-sattva-gold transition-colors"
    title="Follow us on Instagram"
  >
    <FaInstagram size={20} />
  </a>
              <a href="#" className="hover:text-sattva-gold transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-sattva-gold transition-colors"><FaTwitter size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-sattva-gold transition-colors">Home</Link></li>
              <li><Link to="/events" className="hover:text-sattva-gold transition-colors">Events</Link></li>
              <li><Link to="/donate" className="hover:text-sattva-gold transition-colors">Donate</Link></li>
              <li><Link to="/contact" className="hover:text-sattva-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-sattva-gold flex-shrink-0" />
                Jalandhar, Punjab, India
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-sattva-gold flex-shrink-0" />
                ngosattva@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-sattva-gold flex-shrink-0" />
                +91 98772 42079
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>© 2026 SATTVA. All rights reserved. | Made with ❤️ for a fitter India</p>
        </div>
      </div>
    </footer>
  );
}