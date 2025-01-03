import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getToken } from '../utils/tokenManager';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 != 10) * day % 10];
  return `${day}${suffix} ${month} ${year}`;
};

const AccountSection = ({ title, children, editLink }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link to={editLink} className="text-gray-400 hover:text-gray-600">
        <Pencil size={18} />
      </Link>
    </div>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-4 mb-2">
    <p className="text-gray-500">{label}</p>
    <p>{value}</p>
  </div>
);

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data available</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Hi, {userData.first_name} 👋</h1>

        <AccountSection title="Account" editLink="/profile/account/edit-personal-info">
          <div className="flex items-center">
          <img
  src={userData.profile_picture ? URL.createObjectURL(new Blob([new Uint8Array(userData.profile_picture.data)], {type: 'image/jpeg'})) : "/placeholder.svg?height=64&width=64"}
  alt={`${userData.first_name} ${userData.last_name}`}
  className="w-16 h-16 rounded-full mr-4"
/>
            <div>
              <h3 className="font-semibold">{`${userData.first_name} ${userData.last_name}`}</h3>
              <p className="text-gray-500">{userData.address || 'Address not available'}</p>
            </div>
          </div>
        </AccountSection>

        <AccountSection title="Personal Information" editLink="/profile/account/edit-personal-info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="First name" value={userData.first_name} />
            <InfoRow label="Last name" value={userData.last_name} />
            <InfoRow label="E-mail address" value={userData.email} />
            <InfoRow label="Phone number" value={userData.phone_number} />
            <InfoRow label="Date of Birth" value={formatDate(userData.date_of_birth)} />
            <InfoRow label="Gender" value="Male" />
          </div>
        </AccountSection>

        <AccountSection title="Address" editLink="/profile/account/edit-address">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Country" value="India" />
            <InfoRow label="State" value="Karnataka" />
            <InfoRow label="City" value="Bengaluru" />
            <InfoRow label="District" value="Bengaluru" />
            <InfoRow label="Area" value="Anand Nagar" />
            <InfoRow label="Street / House no." value="#12 2nd main" />
          </div>
        </AccountSection>
      </div>
    </div>
  );
};

export default Account;