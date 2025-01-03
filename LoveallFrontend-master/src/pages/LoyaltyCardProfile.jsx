import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBackground from '../components/HeaderBackground';
import LoyaltyCard from '../components/LoyaltyCard';
import Logo from '../components/Logo';
import WaveBackground from '../components/WaveBackground';
import { FiGift, FiHeart } from 'react-icons/fi';

export default function LoyaltyCardProfile() {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/payment-gateway');
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      {/* Background Section */}
      <div className="bg-gradient-to-b from-[#71012D] to-[#971132] relative overflow-hidden h-[700px]">
        <HeaderBackground /> {/* Keeps only HeaderBackground */}

        {/* Main content */}
        <main className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center justify-center h-full -mt-24">
          <div className="text-white text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">SOCIAL LOYALTY CARD</h1>
            <p className="text-lg">
              Contribute into the welfare of our "No One Goes Hungry" Program by using the LoveAll Card for just
              <span className="font-bold"> Rs. 1000 annually</span>
            </p>
          </div>

          {/* Loyalty Card */}
          <div className="w-full max-w-md">
            <LoyaltyCard />
          </div>
        </main>

        {/* Wave Background */}
        <WaveBackground />
      </div>

      {/* Main Content */}
      <div className="bg-white flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">LoveAll Benefits</h2>
          <div className="bg-[#FEF3F6] rounded-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <img src="/placeholder.svg?height=200&width=300" alt="Benefits illustration" className="mb-6 md:mb-0 md:mr-6" />
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiGift className="text-[#FF6B98] text-2xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Exclusive Discounts</h3>
                    <p>Enjoy special discounts at partnered stores, offering great savings on a variety of products and services.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiHeart className="text-[#FF6B98] text-2xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Support Charitable Initiatives</h3>
                    <p>Your purchase helps fund important charitable causes, allowing you to give back while you save.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">LoveAll Partnered Brands</h2>
          <div className="bg-[#FEF3F6] rounded-lg p-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Logo />
              <Logo />
              <Logo />
              <div className="flex items-center justify-center">
                <button className="bg-[#FF6B98] text-white px-6 py-2 rounded-full hover:bg-[#FF8CAF] transition-colors duration-300">
                  See All
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              By purchasing the LoveAll Social Loyalty Card, you agree to our Terms and Conditions. Your contribution helps us make a difference in the lives of those in need.
            </p>
            <button 
              className="bg-[#71012D] text-white px-12 py-3 rounded-full text-lg font-bold hover:bg-[#8B0136] transition-colors duration-300"
              onClick={handleBuyNow}
            >
              BUY NOW
            </button>
            <p className="text-sm text-gray-600 mt-4">Secure Payment with Razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
