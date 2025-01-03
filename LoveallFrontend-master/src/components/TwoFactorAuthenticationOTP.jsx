import React, { useState, useRef, useEffect } from 'react';

export default function TwoFactorAuthenticationOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleResendOTP = () => {
    // Implement OTP resend logic here
    console.log('Resending OTP...');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    // Implement OTP verification logic here
    console.log('Verifying OTP:', otpValue);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="relative">
          <button className="absolute top-0 right-0 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-2">Two factor authentication</h2>
        <p className="text-gray-600 mb-6">Enter the code sent to your email</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-sm text-gray-600 hover:text-gray-800 mb-6 block mx-auto"
          >
            RESEND OTP
          </button>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#F85454] rounded-md hover:bg-[#f63a3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F85454]"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}