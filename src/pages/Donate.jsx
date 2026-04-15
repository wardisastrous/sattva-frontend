// Donate.jsx - Razorpay payment integration
import { useState } from 'react';
import { createPaymentOrder, verifyPayment } from '../services/api';
import { FaHeart, FaShieldAlt, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Donate() {
  const [amount, setAmount] = useState(''); // Custom amount input
  const [selectedAmount, setSelectedAmount] = useState(null); // Preset amount
  const [loading, setLoading] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  // Preset donation amounts
  const presetAmounts = [500, 1000, 2500, 5000];

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(value); // Set as current amount too
  };

  const handleDonate = async () => {
    const donationAmount = Number(amount);
    
    // Validation
    if (!donationAmount || donationAmount < 100) {
      toast.error('Minimum donation amount is ₹100');
      return;
    }
    if (!donorName || !donorEmail) {
      toast.error('Please fill in your name and email');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create order on our backend
      const orderResponse = await createPaymentOrder(donationAmount);
      const { orderId, amount: orderAmount, currency } = orderResponse.data;

      // Step 2: Open Razorpay payment popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // From .env file
        amount: orderAmount, // Amount in paise (₹1 = 100 paise)
        currency: currency || 'INR',
        name: 'SATTVA NGO',
        description: 'Donation for underprivileged athletes',
        order_id: orderId,
        
        // This function runs when payment is SUCCESSFUL
        handler: async (response) => {
          try {
            // Step 3: Verify payment on our backend
            await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              donorName,
              donorEmail,
              amount: donationAmount
            });
            toast.success(`Thank you ${donorName}! Your donation of ₹${donationAmount} was successful! 🎉`);
            setAmount('');
            setSelectedAmount(null);
          } catch (err) {
            toast.error('Payment verification failed. Please contact us.');
          }
        },
        
        // Pre-fill user details in Razorpay popup
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        
        // Razorpay popup theme
        theme: {
          color: '#2D6A4F' // Our brand green color
        },
        
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
          }
        }
      };

      // Load Razorpay script and open popup
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div 
        className="py-20 text-white text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(27,67,50,0.95), rgba(231,111,81,0.85)), url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600") center/cover'
        }}
      >
        <FaHeart className="text-5xl mx-auto mb-4 text-sattva-gold" />
        <h1 className="text-5xl font-bold font-heading mb-4">Make a Donation</h1>
        <p className="text-gray-200 text-lg max-w-xl mx-auto">
          Every rupee you give helps an underprivileged athlete chase their dreams.
        </p>
      </div>

      {/* Donation Form */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="card p-8">
          
          {/* Donor Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-sattva-dark mb-6">Your Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green"
                />
              </div>
            </div>
          </div>

          {/* Preset Amount Buttons */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Amount</h3>
            <div className="grid grid-cols-4 gap-3">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleAmountSelect(preset)}
                  className={`py-3 px-2 rounded-xl border-2 font-semibold transition-all ${
                    selectedAmount === preset
                      ? 'border-sattva-green bg-sattva-green text-white'
                      : 'border-gray-200 hover:border-sattva-green text-gray-700'
                  }`}
                >
                  ₹{preset.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Enter Custom Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSelectedAmount(null); // Deselect preset
                }}
                placeholder="Enter amount (min ₹100)"
                className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sattva-green text-lg"
                min="100"
              />
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={loading}
            className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-3"
          >
            <FaHeart />
            {loading ? 'Processing...' : `Donate ${amount ? `₹${Number(amount).toLocaleString('en-IN')}` : 'Now'}`}
          </button>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1"><FaLock /> Secure Payment</span>
            <span className="flex items-center gap-1"><FaShieldAlt /> Powered by Razorpay</span>
          </div>
        </div>

        {/* Impact Info */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { amount: '₹500', impact: 'Buys training shoes for 1 athlete' },
            { amount: '₹1,000', impact: 'Funds 1 month of coaching' },
            { amount: '₹5,000', impact: 'Sponsors event participation' },
          ].map((item, i) => (
            <div key={i} className="card p-4">
              <div className="text-sattva-green font-bold text-lg">{item.amount}</div>
              <div className="text-gray-500 text-xs mt-1">{item.impact}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}