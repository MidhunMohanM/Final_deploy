import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/tokenManager';

const InputField = ({ label, name, value, onChange }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
  </div>
);

const EditPersonalInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'Male',
  });
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
        setFormData({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phoneNumber: data.phone_number,
          dateOfBirth: data.date_of_birth,
          gender: 'Male', // Hardcoded as per requirement
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          date_of_birth: formData.dateOfBirth,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      navigate('/profile/account');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Personal Information</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="First name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} />
            <InputField label="E-mail address" name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Phone number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <InputField label="Date of birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
          </div>
          <div className="flex justify-end mt-8 space-x-4">
            <button
              type="button"
              onClick={() => navigate('/profile/account')}
              className="px-6 py-3 text-lg font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-lg font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;