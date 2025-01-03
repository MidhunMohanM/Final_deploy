import React from 'react';

export default function TwoFactorAuthenticationEmrCode() {
  const emergencyCodes = [
    '2222 2222', '2222 2222', '2222 2222',
    '2222 2222', '2222 2222', '2222 2222',
    '2222 2222', '2222 2222', '2222 2222',
    '2222 2222', '2222 2222', '2222 2222'
  ];

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading emergency codes');
  };

  const handlePrint = () => {
    // Implement print functionality
    console.log('Printing emergency codes');
  };

  const handleCopy = () => {
    // Implement copy functionality
    console.log('Copying emergency codes');
  };

  const handleDone = () => {
    // Implement done functionality
    console.log('Two-factor authentication setup completed');
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
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-500 font-semibold text-lg mb-2">Successfully enabled</p>
          <p className="text-gray-600 text-center mb-4">
            Save this emergency codes and store it somewhere safe
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {emergencyCodes.map((code, index) => (
            <div key={index} className="bg-gray-100 p-2 text-center rounded">
              {code}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button onClick={handleDownload} className="flex items-center justify-center p-2 bg-gray-200 rounded hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button onClick={handlePrint} className="flex items-center justify-center p-2 bg-gray-200 rounded hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
          <button onClick={handleCopy} className="flex items-center justify-center p-2 bg-gray-200 rounded hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
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