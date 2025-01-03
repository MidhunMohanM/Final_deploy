'use client'

import React, { useState, useRef, useEffect } from "react";
import { registerBusiness, sendOtp, verifyOtp } from '../../service/authentication.js'; // Import the API functions
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessRegister({setShowPage}) {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    businessType: "",
    entityType: "",
    contactNumber: "",
    agreeToTerms: false,
    businessAddress: "",
    gstin: "",
    tan: "",
    businessPurpose: "",
    ownerName: "",
    ownerContactNumber: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const otpInputs = useRef([]);

  useEffect(() => {
    let interval;
    if (otpModalOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpModalOpen, timer]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1); // Move to the next step
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Move to the previous step
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 2) { // Sending OTP on the second step
      try {
        // Prepare data for registration
        const registrationData = {
          business_name: formData.businessName,
          business_email: formData.email,
          business_type: formData.businessType,
          entity_type: formData.entityType,
          contact_number: formData.contactNumber,
          gstin: formData.gstin,
          tan: formData.tan,
          owner_name: formData.ownerName,
          owner_contact_number: formData.ownerContactNumber,
        };

        // Call the registration API
        await registerBusiness(registrationData);

        // Call the send OTP API
        //await sendOtp(formData.email);

        setOtpModalOpen(true); // Open OTP modal
        setTimer(60); // Reset timer
      } catch (error) {
        alert(error.message); // Show error message
      }
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        otpInputs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      // Call the verify OTP API
      await verifyOtp(formData.email, otpValue);
      setOtpModalOpen(false);
      setSuccessModalOpen(true); // Show success modal on successful verification
    } catch (error) {
      alert(error.message); // Show error message
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp(formData.email); // Resend OTP
      setTimer(60);
    } catch (error) {
      alert(error.message); // Show error message
    }
  };

  const closeModal = () => {
    setOtpModalOpen(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
    // Optionally reset form or perform other actions
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
      <button 
          onClick={() => setShowPage(1)} 
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <MoveLeft />
        </button>
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-[#8B1539]">Love All!</span>
          </h1>
          <p className="text-xl mb-8">
            <span className="font-semibold">Partner with us</span> to offer exclusive discounts and help nourish Bangalore, one meal at a time.
          </p>
          <div className="hidden lg:block">
            <img
              src="https://dotxero.b-cdn.net/wp-content/uploads/2021/04/analytics.svg"
              alt="Business Analytics Illustration"
              style={{ width: '500px', height: '400px' }}
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-red-500">Registration</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    id="businessName"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">Business E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="businessType">Business Type</label>
                  <select
                    id="businessType"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539] bg-white"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                    <option value="hotel">Hotel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="entityType">Entity Type</label>
                  <select
                    id="entityType"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539] bg-white"
                    value={formData.entityType}
                    onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                    required
                  >
                    <option value="">Select Entity Type</option>
                    <option value="private">Private Limited</option>
                    <option value="proprietorship">Proprietorship</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="tel"
                    id="contactNumber"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="businessAddress">Business Address</label>
                  <input
                    type="text"
                    id="businessAddress"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="gstin">GSTIN</label>
                  <input
                    type="text"
                    id="gstin"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="tan">TAN</label>
                  <input
                    type="text"
                    id="tan"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.tan}
                    onChange={(e) => setFormData({ ...formData, tan: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="businessPurpose">Business Purpose</label>
                  <input
                    type="text"
                    id="businessPurpose"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.businessPurpose}
                    onChange={(e) => setFormData({ ...formData, businessPurpose: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="ownerName">Owner's Name</label>
                  <input
                    type="text"
                    id="ownerName"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="ownerContactNumber">Owner's Contact Number</label>
                  <input
                    type="tel"
                    id="ownerContactNumber"
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                    value={formData.ownerContactNumber}
                    onChange={(e) => setFormData({ ...formData, ownerContactNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-[#8B1539] border-gray-300 rounded focus:ring-[#8B1539]"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    required
                  />
                  <label htmlFor="terms" className="text-sm">
                    Agree with{" "}
                    <a href="/terms" className="text-[#8B1539] hover:underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
              </>
            )}

            <div className="flex justify-center items-center mt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 mr-4 text-sm font-medium text-[#8B1539] bg-white border border-[#8B1539] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1539]"
                >
                  Back
                </button>
              )}

              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8B1539] rounded-md hover:bg-[#6d102c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1539]"
                >
                  Next
                </button>
              )}

              {currentStep === 2 && (
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8B1539] rounded-md hover:bg-[#6d102c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1539]"
                >
                  Send OTP
                </button>
              )}
            </div>

            <p className="text-center text-sm">
              Already a member?{" "}
              <Link to="/" className="text-[#8B1539] hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {otpModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4 relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  &times; {/* Cross symbol */}
                </button>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                      Enter OTP
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        We've sent a one-time password to your email. Please enter it below to verify your account.
                      </p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleOtpSubmit} className="mt-5 sm:mt-6">
                  <div className="flex justify-center space-x-2 mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1539]"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        ref={(el) => (otpInputs.current[index] = el)}
                      />
                    ))}
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500">
                      Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-[#8B1539] rounded-md hover:bg-[#6d102c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1539]"
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={timer > 0}
                    className="w-full mt-2 px-4 py-2 text-sm font-medium text-[#8B1539] bg-white border border-[#8B1539] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1539] disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {successModalOpen && ( // Success modal
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                    Registration Successful!
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR4auj-GjvRkoUt6bMVrIX9mD0qlLV9tS-7PR2mI9NosuhkFbBm" alt="Sucessfulogo" />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Thank you for registering your business with LoveAll. We're reviewing your information to ensure authenticity. This process can take up to 7 days. In the meantime, you can still explore our platform, but certain features will be locked until your profile is fully verified.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => {
                      closeSuccessModal(); // Close the modal
                      window.location.href = "/"; // Navigate to /login
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#8B1539] rounded-md hover:bg-[#6d102c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1539]"
                  >
                    Done
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  )
}