import React, { useState, useContext, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import logoImage from "../assets/images/Logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import PopUpContext from "../context/PopUpContext";
import { useAuth } from "../hooks/useAuth";

const Login = ({ className }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const { login, sendOtp } = useAuth();
  const [loginWithPassword, setLoginWithPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [otpField, showOtpField] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const { setShowLoginPopup } = useContext(PopUpContext);
  const navigate = useNavigate();

  const handlePopUp = () => {
    console.log("Pop up closed");
    setShowLoginPopup(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { message, redirectTo, success } = await login({
      email,
      password,
      rememberMe,
      otp: otp.join('')
    });
    setMessage(message);
    if (success) {
      handlePopUp();
      navigate(redirectTo);
    }
  };

  const handleLoginType = () => {
    setLoginWithPassword((prev) => !prev);
    console.log("Handle login type");
  };

  const handleOtpLogin = async (email) => {
    const { success, message } = await sendOtp({ email });
    if (success) {
      showOtpField(true);
    } else {
      setMessage(message);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div
      className={
        "max-w-md w-full space-y-8 border border-gray-300 rounded-lg p-8 box-border shadow-lg " +
        className
      }
    >
      <div className="relative">
        <button
          onClick={handlePopUp}
          className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>
        <div className="flex justify-center">
          <img src={logoImage} alt="LOVE ALL Logo" className="h-16 w-auto" />
        </div>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {loginWithPassword ? (
          <>
            <div className="rounded-md space-y-4">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-full relative block w-full px-5 py-4 border border-gray-700 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm font-medium"
                  placeholder="unkown213@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-full relative block w-full px-5 py-4 border border-gray-700 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm font-medium"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-700 rounded-md"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 font-medium"
              >
                Remember me next time
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 flex justify-center py-4 px-3 border border-transparent text-sm font-medium rounded-[22px] text-white"
                style={{
                  background:
                    "linear-gradient(180deg, #5F0013 0%, #C71B2F 50%, #E34234 100%)",
                }}
              >
                Log in
              </button>
            </div>
          </>
        ) : !otpField ? (
          <div className="flex flex-col gap-6">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-full relative block w-full px-5 py-4 border border-gray-700 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm font-medium"
              placeholder="unkown213@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleOtpLogin(email)}
                className="w-1/2 flex justify-center py-4 px-3 border border-transparent text-sm font-medium rounded-[22px] text-white"
                style={{
                  background:
                    "linear-gradient(180deg, #5F0013 0%, #C71B2F 50%, #E34234 100%)",
                }}
              >
                Send OTP
              </button>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-700 rounded-md"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 font-medium"
              >
                Remember me next time
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="number"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleOtpLogin(email)}
            className="text-sm text-gray-600 hover:text-gray-800 mb-6 block mx-auto"
          >
            RESEND OTP
          </button>
          <div>
            <button
              type="submit"
              className=" w-full px-4 py-2 text-sm font-medium text-white bg-[#F85454] rounded-md hover:bg-[#f63a3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F85454]"
            >
              Verify
            </button>
          </div>
          </>
        )}
      </form>
      {message && <p>{message}</p>}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleLoginType}
          className="text-sm text-black underline font-medium"
        >
          {loginWithPassword ? "Log in with OTP" : "Log in with Password"}
        </button>
        <p className="mt-2 text-xs text-black font-medium">or SIGN UP with</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="google.com" className="text-2xl">
            <FontAwesomeIcon icon={faGoogle} style={{ color: "#4285F4" }} />
          </a>
          <a href="google.com" className="text-2xl">
            <FontAwesomeIcon icon={faFacebook} style={{ color: "#1877F2" }} />
          </a>
          <a href="google.com" className="text-2xl">
            <FontAwesomeIcon icon={faApple} style={{ color: "#000000" }} />
          </a>
        </div>
      </div>

      <p className="mt-2 text-center text-sm text-gray-900 font-medium">
        Don't have an account?{" "}
        <Link to="/register"
          className="font-medium text-red-600 hover:text-red-500"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
