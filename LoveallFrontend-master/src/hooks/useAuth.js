import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, removeToken, setToken } from "../utils/tokenManager";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const AUTH_TOKEN_MAP = {
    user: 'user_auth_token',
    business: 'business_auth_token',
    admin: 'admin_auth_token'
  }

  const getAuthType = () => {
    for (const [type, token] of Object.entries(AUTH_TOKEN_MAP)) {
      if (getToken(token)) return type;
    }
    return 'other';
  };
  
  const [authState, setAuthState] = useState(() => ({
    isAuthenticated: Object.values(AUTH_TOKEN_MAP).some(token => !!getToken(token)),
    authType: getAuthType(),
  }));
  
  useEffect(() => {
    console.log(`Authentication Type: ${authState.authType}`);
  }, [authState.authType]);
  const api = process.env.REACT_APP_API_URL;

  const login = async ({ email, password, otp, rememberMe }) => {
    const loginApi = api + "/auth/login";
    try {
      const response = await fetch(loginApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, otp })
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const auth_token = data.token;
        let token;
        console.log(auth_token)
        if (data.redirectTo === "/") token = 'user_auth_token';
        else if (data.redirectTo === "/business") token = 'business_auth_token';
        else if (data.redirectTo === "/admin") token = 'admin_auth_token';
        removeToken('user_auth_token');
        removeToken('business_auth_token');
        removeToken('admin_auth_token');
        setToken({ rememberMe, auth_token, token});
        setAuthState({
          isAuthenticated: true,
          authType: getAuthType(), // Re-check authType after login
        });
      }
      return { message: data.message, redirectTo: data.redirectTo, success: data.success };
    } catch (error) {
      console.log(error);
      return { message: "Error in login", redirectTo: null, success: false };
    }
  };

  const logout = async (type) => {
    let token;
    if (type === 'user') token = 'user_auth_token';
    else if (type === 'business') token = 'business_auth_token';
    else if (type === 'admin') token = 'admin_auth_token';
    removeToken(token);
    setAuthState({
      isAuthenticated: false,
      authType: 'other', // Default to 'other' after logout
    });
  };

  const register = async (payload) => {
    const registerApi = api + "/auth/register";
    try {
      const response = await fetch(registerApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          phone_number: payload.phone_number,
          password: payload.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        // navigate('/registration2');
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  }

  const sendOtp = async (payload) => {
    const sendOtpAPi = api + '/auth/send-otp'
    let data;
    try {
      const response = await fetch(sendOtpAPi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: payload.email
        })
      })
      data = await response.json();
      if (response.ok) {
        console.log('OTP send successfully');
      }
      else {
        console.log(`Failed: ${data.message}`)
      }  
    } catch (error) {
      console.error('Error during Login with otp:', error);
      alert('An error occurred during Login. Please try again.');
    } finally {
      return data;
    }
  }

  return (
    <AuthContext.Provider value={{ authState, login, logout, register, sendOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
