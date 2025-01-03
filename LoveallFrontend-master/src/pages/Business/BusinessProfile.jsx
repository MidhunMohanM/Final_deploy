import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import BusinessProfileHeader from '../../components/BusinessProfileHeader';

const BusinessProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: 'loveall',
    address: '456 MG Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '560001',
    phoneNumber: '9544693196',
    emailAddress: 'midhunmohanmararmp@gmail.com',
    businessDescription: 'None'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleDateString());
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setLastUpdated(new Date().toLocaleDateString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessProfileHeader />

      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">Updated last on: {lastUpdated}</p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 text-white rounded-md"
            style={{
              background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
            }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium mb-1">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="businessDescription" className="block text-sm font-medium mb-1">Business Description</label>
            <textarea
              id="businessDescription"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-md"
                style={{
                  background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
                }}
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BusinessProfile;