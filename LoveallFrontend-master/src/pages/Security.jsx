import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 2L19 4M11.5 11.5L19 4M7.5 19.5L4 16H2V12H4L6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10C14 12.2091 12.2091 14 10 14C8.97631 14 8.04414 13.5826 7.33984 12.9062L4 16M10 10H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DevicesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 15H4C2.89543 15 2 14.1046 2 13V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V13C22 14.1046 21.1046 15 20 15H14M10 15V19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19V15M10 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="48" height="80" viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="47" height="79" rx="7.5" stroke="#E5E7EB"/>
    <path d="M20 4H28" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LaptopIcon = () => (
  <svg width="96" height="64" viewBox="0 0 96 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 56C1 53.2386 3.23858 51 6 51H90C92.7614 51 95 53.2386 95 56V57C95 60.3137 92.3137 63 89 63H7C3.68629 63 1 60.3137 1 57V56Z" stroke="#E5E7EB"/>
    <rect x="9.5" y="0.5" width="77" height="51" rx="3.5" stroke="#E5E7EB"/>
  </svg>
);

const SecurityOption = ({ icon, title, description, children }) => (
  <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
    <div className="flex items-center mb-2">
      <span className="text-gray-400 mr-2">{icon}</span>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-500 text-sm mb-4">{description}</p>
    {children}
  </div>
);

const DeviceCard = ({ icon, name, lastUsed, onLogout }) => (
  <div className="flex flex-col items-center mb-4 w-full sm:w-1/2">
    <div className="flex-shrink-0 mb-2">{icon}</div>
    <div className="text-center">
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-gray-500">{lastUsed}</p>
      <button
        onClick={onLogout}
        className="text-xs text-orange-500 hover:text-orange-700 font-medium mt-2"
      >
        Log out
      </button>
    </div>
  </div>
);

const Security = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const handleChangePassword = () => {
    console.log('Change password clicked');
  };

  const handleLogout = (device) => {
    console.log(`Logging out from ${device}`);
  };

  const handleLogoutAll = () => {
    logout("user");
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8">Keep Your Account Safe!</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <KeyIcon /> <span className="ml-2">Security</span>
        </h2>
      </div>
      
      <SecurityOption
        icon={<KeyIcon />}
        title="Change password"
        description="Changing password will log out from all the devices."
      >
        <button
          onClick={handleChangePassword}
          className="text-gray-700 text-sm font-medium hover:text-gray-900"
        >
          Change password
        </button>
      </SecurityOption>
      
      <SecurityOption
        icon={<DevicesIcon />}
        title="Connected devices"
        description="Not your device? Disconnect now to protect your data and privacy."
      >
        <div className="flex flex-wrap -mx-2">
          <DeviceCard
            icon={<PhoneIcon />}
            name="Karthik's iPhone"
            lastUsed="Last active on 10:07 PM, 3rd June, 2023"
            onLogout={() => handleLogout("Karthik's iPhone")}
          />
          <DeviceCard
            icon={<LaptopIcon />}
            name="Karthik's PC"
            lastUsed="Logged in now on"
            onLogout={() => handleLogout("Karthik's PC")}
          />
        </div>
      </SecurityOption>
      
      <SecurityOption
        icon={<LogoutIcon />}
        title="Log out"
        description="Ready to leave? Log out securely to protect your account."
      >
        <button
          onClick={handleLogoutAll}
          className="text-gray-700 text-sm font-medium hover:text-gray-900"
        >
          Log out
        </button>
      </SecurityOption>
    </div>
  );
};

export default Security;