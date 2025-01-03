import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import LoveAllCard from './LoveAllCard';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { icon: '💳', label: 'Love All card', path: '/profile' },
    { icon: '📊', label: 'Dashboard', path: '/profile/dashboard' },
    { icon: '👤', label: 'Account', path: '/profile/account' },
    { icon: '🔒', label: 'Security', path: '/profile/security' },
    { icon: '💬', label: 'Customer Support', path: '/profile/support' }
  ];

  return (
    <div className="bg-gradient-to-b from-[#47001C] to-[#971132] p-5 h-screen w-64 text-white">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center p-2 mb-2 rounded-lg text-white transition-colors duration-300 hover:bg-white hover:bg-opacity-20 ${
            activePage === item.label ? 'bg-white bg-opacity-20' : ''
          }`}
          onClick={() => setActivePage(item.label)}
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const Profile = () => {
  const [activePage, setActivePage] = useState('Love All card');
  const location = useLocation();

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-auto p-8">
        {location.pathname === '/profile' ? <LoveAllCard /> : <Outlet />}
      </div>
    </div>
  );
};

export default Profile;