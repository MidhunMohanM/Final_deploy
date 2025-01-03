import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../utils/tokenManager";
import { ChevronUp, ChevronDown, X, ArrowLeft } from 'lucide-react';

const AccountsAdmin = () => {
  const [accountType, setAccountType] = useState("business"); // "business" or "user"
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [verification, setVerification] = useState(false);

  const { authState } = useAuth();
  const { authType, isAuthenticated } = authState;
  const api = process.env.REACT_APP_API_URL;
  const fetchAccounts = useCallback(async () => {
    try {
      const token = getToken('admin_auth_token');
      const endpoint = accountType === 'business' ? 'business-accounts' : 'user-accounts';
      const response = await fetch(`${api}/admin/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setAccounts(accountType === 'business' ? data.businesses : data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api, accountType]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccounts();
    }
  }, [isAuthenticated, fetchAccounts, verification]);

  const handleDetailsClick = async (account) => {
    try {
      const token = getToken('admin_auth_token');
      const endpoint = accountType === 'business' ? 'business-accounts' : 'user-accounts';
      const id = accountType === 'business' ? account.business_id : account.user_id;
      
      const response = await fetch(`${api}/admin/${endpoint}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch account details: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSelectedAccount(accountType === 'business' ? data.business : data.user);
      setShowDetailsModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyBusiness = async ({business_email}) => {
    setVerification(true);
    try {
      const token = getToken('admin_auth_token');
      
      const response = await fetch(`${api}/admin/manual-verification`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"business_email": business_email})
      });
      if (!response.ok) {
        alert("Verification failed");
        throw new Error(`Failed to fetch account details: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(err.message);
    }
    finally {
      setVerification(false);
      setShowDetailsModal(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to view accounts.</div>;
  }

  if (loading) {
    return <div>Loading accounts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="mb-4 px-4 py-2 border rounded-md"
        >
          <option value="business">Business Accounts</option>
          <option value="user">User Accounts</option>
        </select>

        {/* Search and Sort Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by</span>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#971132] focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">{accountType === 'business' ? 'Business Name' : 'Name'}</option>
              <option value="email">Email</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    {accountType === 'business' ? 'Business Name' : 'Name'}
                    <div className="flex flex-col">
                      <ChevronUp className="h-3 w-3" />
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                {accountType === 'user' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={accountType === 'business' ? account.business_id : account.user_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {accountType === 'business' ? account.business_name : account.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.email}
                  </td>
                  {accountType === 'user' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.phone_number}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(account.registered_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        account.status === "Approved" || account.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDetailsClick(account)}
                      className="text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-md"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-center w-full">Account Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {accountType === 'business' ? 'Business Name' : 'Name'}
                </label>
                <p className="mt-1">{accountType === 'business' ? selectedAccount.business_name : selectedAccount.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1">{selectedAccount.email}</p>
              </div>
              {accountType === 'user' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="mt-1">{selectedAccount.phone_number}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1">{selectedAccount.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                <p className="mt-1">{new Date(selectedAccount.registered_date).toLocaleDateString()}</p>
              </div>
              {accountType === 'business' && selectedAccount.status === 'Pending' && (
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm uppercase tracking-wider rounded shadow-md hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => verifyBusiness({business_email: selectedAccount.email})}>
                  {verification ? 'Verifying' : 'Verify'}
                </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsAdmin;

