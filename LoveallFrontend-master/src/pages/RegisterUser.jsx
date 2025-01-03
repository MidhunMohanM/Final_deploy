import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import Logo from '../components/Logo';

export default function Component({setShowPage}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate('/otp-sent', { state: { email: formData.email } });
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-lg shadow-xl relative">
        <button 
          onClick={() => setShowPage(1)} 
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <MoveLeft />
        </button>
        <div className="flex justify-center">
          <Logo className="w-40 h-auto" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to <span className="text-red-600">Love All!</span></h2>
            <p className="mb-4 text-gray-600">Sign up to get more discounts and contribute to the community.</p>
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-30NQnVtn6jckDg8R7c2PfLCahWCanD.png" alt="Registration illustration" className="w-full max-w-md" />
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-1/2 max-w-md">
            <div className="mb-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-b from-[#5F0013] via-[#C71B2F] to-[#E34234] text-white font-bold rounded-full hover:opacity-90 transition duration-300"
              >
                Register
              </button>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600">
              Already a member? <a href="/login" className="text-red-600 hover:text-red-800">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}