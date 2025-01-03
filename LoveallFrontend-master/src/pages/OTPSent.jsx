import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';

const OTPSent = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(360); // 6 minutes in seconds
  const navigate = useNavigate();
  const { state } = useLocation(); // Expecting email in state
  const { email } = state || {};

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      if (response.ok) {
        console.log('OTP verified successfully');
        navigate('/'); // or merchant-dashboard
      } else {
        const errorData = await response.json();
        alert(`Failed to verify OTP: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying the OTP. Please try again.');
    }
  };

  const handleResendOTP = () => {
    // Logic for resending OTP would go here
    setTimeLeft(360); // Reset timer
    setOtp(['', '', '', '', '', '']); // Clear OTP fields
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (value !== '' && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-gray-300 rounded-lg p-8 box-border shadow-lg">
        <div className="relative">
          <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <div className="flex justify-center">
            <Logo />
          </div>
        </div>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">OTP sent !</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please check your mail for the OTP.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="text-center">
            <button 
              type="button"
              className="text-sm text-gray-900 font-medium"
              onClick={handleResendOTP}
            >
              RESEND OTP
            </button>
            <p className="text-xs text-gray-500 mt-1">in {formatTime(timeLeft)} seconds</p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 flex justify-center py-4 px-3 border border-transparent text-sm font-medium rounded-[22px] text-white"
              style={{
                background: 'linear-gradient(180deg, #5F0013 0%, #C71B2F 50%, #E34234 100%)'
              }}
            >
              Continue →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPSent;