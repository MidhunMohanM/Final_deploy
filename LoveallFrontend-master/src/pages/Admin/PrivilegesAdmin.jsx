import React, { useState } from "react";
import { Settings2 } from 'lucide-react';

const PrivilegesAdmin = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [generalForm, setGeneralForm] = useState({
    siteName: "",
    adminEmail: "",
    otpDuration: "",
  });

  const [emailForm, setEmailForm] = useState({
    welcomeSubject: "",
    welcomeBody: "",
    resetSubject: "",
    resetBody: "",
  });

  const [securityForm, setSecurityForm] = useState({
    maxLoginAttempts: "",
    twoFactorAuth: "",
    passwordComplexity: "",
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission based on active tab
    const formData = {
      general: generalForm,
      email: emailForm,
      security: securityForm,
    };
    console.log(formData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Email Templates":
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="welcomeSubject" className="block text-sm font-medium text-gray-700 mb-1">
                Welcome Email Subject
              </label>
              <input
                type="text"
                id="welcomeSubject"
                name="welcomeSubject"
                value={emailForm.welcomeSubject}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="welcomeBody" className="block text-sm font-medium text-gray-700 mb-1">
                Welcome Email Body
              </label>
              <textarea
                id="welcomeBody"
                name="welcomeBody"
                value={emailForm.welcomeBody}
                onChange={handleEmailChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="resetSubject" className="block text-sm font-medium text-gray-700 mb-1">
                Password Reset Email Subject
              </label>
              <input
                type="text"
                id="resetSubject"
                name="resetSubject"
                value={emailForm.resetSubject}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="resetBody" className="block text-sm font-medium text-gray-700 mb-1">
                Password Reset Email Body
              </label>
              <textarea
                id="resetBody"
                name="resetBody"
                value={emailForm.resetBody}
                onChange={handleEmailChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
            </div>
          </div>
        );

      case "Security":
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 mb-1">
                Max Login Attempts
              </label>
              <input
                type="number"
                id="maxLoginAttempts"
                name="maxLoginAttempts"
                value={securityForm.maxLoginAttempts}
                onChange={handleSecurityChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                The maximum number of failed login attempts before account lockout.
              </p>
            </div>

            <div>
              <label htmlFor="twoFactorAuth" className="block text-sm font-medium text-gray-700 mb-1">
                Two-Factor Authentication
              </label>
              <input
                type="text"
                id="twoFactorAuth"
                name="twoFactorAuth"
                value={securityForm.twoFactorAuth}
                onChange={handleSecurityChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Require two-factor authentication for all users.
              </p>
            </div>

            <div>
              <label htmlFor="passwordComplexity" className="block text-sm font-medium text-gray-700 mb-1">
                Password Complexity
              </label>
              <input
                type="text"
                id="passwordComplexity"
                name="passwordComplexity"
                value={securityForm.passwordComplexity}
                onChange={handleSecurityChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Set the required complexity for user passwords.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={generalForm.siteName}
                onChange={handleGeneralChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                This is the name that will be displayed across the platform.
              </p>
            </div>

            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={generalForm.adminEmail}
                onChange={handleGeneralChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                The main contact email for platform administrators.
              </p>
            </div>

            <div>
              <label htmlFor="otpDuration" className="block text-sm font-medium text-gray-700 mb-1">
                OTP Duration (minutes)
              </label>
              <input
                type="number"
                id="otpDuration"
                name="otpDuration"
                value={generalForm.otpDuration}
                onChange={handleGeneralChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                The duration (in minutes) for which an OTP remains valid.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Settings2 className="h-6 w-6" />
          <h1 className="text-2xl font-bold">My Privileges</h1>
        </div>
        <p className="text-gray-600">
          Manage your platform-wide settings here. Changes will be applied immediately.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {["General", "Email Templates", "Security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {renderTabContent()}
        
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-[#971132] text-white rounded-md hover:bg-[#7d0e2a] transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivilegesAdmin;

