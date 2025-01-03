import React from "react";

const SettingsAdmin = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">System Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">System Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#971132] focus:ring-[#971132]"
                  defaultValue="LoveAll Admin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#971132] focus:ring-[#971132]"
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#971132] focus:ring-[#971132]"
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#971132] focus:ring-[#971132]"
                  defaultValue="30"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-[#971132] text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;

