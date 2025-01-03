// src/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/business'; // Replace with your backend URL

export const registerBusiness = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error.response.data; // Handle error responses
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send-otp`, { business_email: email });
    return response.data;
  } catch (error) {
    throw error.response.data; // Handle error responses
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, { business_email: email, otp });
    return response.data;
  } catch (error) {
    throw error.response.data; // Handle error responses
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      business_email: email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const forgetpassword = async ({ business_email, otp, password }) => {
  try {
    const response = await axios.post(`${API_URL}/forget-password`, {
      business_email,
      otp,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Forgot password request failed');
  }
};


export const changePasswordAPI = async (email, currentPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/ChangePass`, {
      business_email: email,
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Change password failed');
  }
};


