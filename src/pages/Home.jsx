// Home.jsx - The main landing page of SATTVA
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaRunning, FaBasketballBall, FaFistRaised, FaHeart, FaUsers, FaTrophy } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <ActivitiesSection />
      <UpcomingEventBanner />
      <CtaSection />
    </div>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{
        // Gradient overlay + background image
        background: 'linear-gradient(135deg, rgba(27,67,50,0.92) 0%, rgba(45,106,79,0.85) 100%), url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600") center/cover no-repeat'
      }}
    >
      <div className="text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <span className="inline-block bg-sattva-gold text-sattva-dark text-sm font-bold px-4 py-1 rounded-full mb-6 uppercase tracking-wide">
          Fitness For All • Unity Through Sport
        </span>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-heading">
          Transform Lives Through
          <span className="text-sattva-gold block">Fitness & Unity</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          SATTVA is a fitness-based NGO promoting health, wellness, and sporting 
          excellence while supporting underprivileged athletes across India.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/events" className="btn-primary text-lg px-8 py-4">
            View Events
          </Link>
          <Link to="/donate" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-sattva-dark">
            Donate Now
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}

// ============ STATS SECTION ============
function StatsSection() {
  const stats = [
    { number: '1000+', label: 'Athletes Supported', icon: <FaUsers /> },
    { number: '100+', label: 'Events Organized', icon: <FaTrophy /> },
    { number: '₹1.5L+', label: 'Donations Raised', icon: <FaHeart /> },
    { number: '3+', label: 'Cities Reached', icon: <FaRunning /> },
  ];

  return (
    <section className="bg-sattva-green text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-3xl mb-2 flex justify-center text-sattva-gold">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold font-heading">{stat.number}</div>
              <div className="text-sm text-green-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ MISSION SECTION ============
function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text content */}
          <div>
            <span className="text-sattva-green font-semibold uppercase tracking-wide text-sm">Our Purpose</span>
            <h2 className="section-title mt-2">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              SATTVA (Sanskrit for "purity" and "goodness") believes that fitness 
              is a fundamental right. We bridge the gap between passion and opportunity 
              by organizing community events and channeling donations to support 
              athletes who lack resources.
            </p>
            <ul className="space-y-3">
              {[
                'Promote fitness awareness in communities',
                'Organize inclusive sporting events for all ages',
                'Fund equipment and training for underprivileged athletes',
                'Build a healthier, unified India through sport'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-sattva-green mt-1 font-bold text-lg">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1547919307-1ecb10702e6f?w=600" 
              alt="Community fitness"
              className="rounded-2xl shadow-2xl w-full object-cover h-96"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-sattva-gold text-sattva-dark p-4 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold">2026</div>
              <div className="text-xs font-medium">Founded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ ACTIVITIES SECTION ============
function ActivitiesSection() {
  const activities = [
    {
      icon: <FaRunning className="text-4xl" />,
      title: 'Marathons',
      description: 'City-wide running events promoting cardiovascular fitness and community spirit.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <GiWeightLiftingUp className="text-4xl" />,
      title: 'Workout Sessions',
      description: 'Free group workout sessions in parks and community centers.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <FaBasketballBall className="text-4xl" />,
      title: 'Basketball Events',
      description: 'Tournaments and training camps for aspiring basketball players.',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: <FaFistRaised className="text-4xl" />,
      title: 'Kickboxing',
      description: 'Kickboxing workshops focused on discipline, fitness, and self-defense.',
      color: 'bg-red-50 text-red-600'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sattva-green font-semibold uppercase tracking-wide text-sm">What We Do</span>
          <h2 className="section-title mt-2">Our Activities</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We organize diverse sporting events to cater to different fitness interests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, i) => (
            <div key={i} className="card p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className={`${activity.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {activity.icon}
              </div>
              <h3 className="text-xl font-bold text-sattva-dark mb-2">{activity.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ UPCOMING EVENT BANNER ============
function UpcomingEventBanner() {
  return (
    <section 
      className="py-16 text-white relative"
      style={{
        background: 'linear-gradient(135deg, rgba(27,67,50,0.95), rgba(231,111,81,0.9)), url("https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600") center/cover'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="bg-sattva-gold text-sattva-dark text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wide">
          🏃 Upcoming Event
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 font-heading">
          SATTVA City Marathon
        </h2>
        <p className="text-xl text-gray-200 mb-2">📅 June 1, 2026 | 📍 Jalandhar, Punjab</p>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          A city-wide marathon promoting fitness and unity. Open for all age groups. 
          Join hundreds of runners making a difference!
        </p>
        <Link to="/events" className="btn-primary text-lg px-8 py-4">
          Register Now →
        </Link>
      </div>
    </section>
  );
}

// ============ CTA (CALL TO ACTION) SECTION ============
function CtaSection() {
  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <FaHeart className="text-5xl text-sattva-orange mx-auto mb-4" />
        <h2 className="section-title">Make a Difference Today</h2>
        <p className="text-gray-500 text-lg mb-8">
          Your donation helps us provide equipment, training, and opportunities 
          to underprivileged athletes across India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/donate" className="btn-primary text-lg px-8 py-4">
            💛 Donate Now
          </Link>
          <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
            Get Involved
          </Link>
        </div>
      </div>
    </section>
  );
}