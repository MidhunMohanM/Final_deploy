import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const EditAddress = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: 'India',
    state: 'Karnataka',
    city: 'Bengaluru',
    district: 'Bengaluru',
    area: 'Anand Nagar',
    streetHouseNo: '#12 2nd main',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log('Updated address:', formData);
    navigate('/profile/account');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Address</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />
            <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
            <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
            <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
            <InputField label="Area" name="area" value={formData.area} onChange={handleChange} />
            <InputField label="Street / House no." name="streetHouseNo" value={formData.streetHouseNo} onChange={handleChange} />
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

export default EditAddress;