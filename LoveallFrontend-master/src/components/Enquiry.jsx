import React from 'react';

export default function Enquiry() {
  return (
    <div className="w-full max-w-md mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center" style={{
        background: 'linear-gradient(90deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Get more details on LoveAll
      </h2>
      <p className="text-gray-600 mb-8 text-center text-sm">
        Subscribe to our loyalty program for daily/weekly update<br />of our products and services.
      </p>
      <form className="flex justify-center items-center space-x-2">
        <input
          type="email"
          placeholder="EMAIL"
          className="w-2/3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
          style={{
            borderColor: 'rgba(71,0,28,0.5)'
          }}
          required
        />
        <button
          type="submit"
          className="w-1/3 px-4 py-2 text-white font-semibold rounded-full transition-colors duration-300 whitespace-nowrap text-sm"
          style={{
            background: 'linear-gradient(90deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
          }}
        >
          KEEP IN TOUCH
        </button>
      </form>
    </div>
  );
}