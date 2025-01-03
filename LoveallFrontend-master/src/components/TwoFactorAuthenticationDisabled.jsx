import React from 'react';

export default function TwoFactorAuthenticationDisabled() {
  const handleDone = () => {
    // Implement the action for the Done button
    console.log('Two-factor authentication disabled');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Two factor authentication</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-orange-500 font-semibold text-lg">Successfully disabled</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleDone}
            className="px-6 py-2 text-sm font-medium text-white bg-[#F85454] rounded-md hover:bg-[#f63a3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F85454]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}