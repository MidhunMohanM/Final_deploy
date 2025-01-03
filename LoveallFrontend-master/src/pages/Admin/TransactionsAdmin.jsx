import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../utils/tokenManager";
import { FileDown, FileSpreadsheet } from 'lucide-react';

const TransactionsAdmin = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    userId: '',
    storeId: '',
    status: ''
  });
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const api = process.env.REACT_APP_API_URL;

  const fetchTransactions = useCallback(async () => {
    try {
      const token = getToken('admin_auth_token');
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${api}/admin/transactions?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions(data.transactions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api, filters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [isAuthenticated, fetchTransactions]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    fetchTransactions();
  };

  const exportCSV = async () => {
    try {
      const token = getToken('admin_auth_token');
      const response = await fetch(`${api}/admin/transactions/export`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to export transactions: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const downloadInvoices = async () => {
    try {
      const token = getToken('admin_auth_token');
      const response = await fetch(`${api}/admin/transactions/invoices`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to download invoices: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoices.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to view transactions.</div>;
  }

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Transaction Monitor</h1>
        <p className="text-gray-600">View and manage customer transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={filters.userId}
          onChange={handleFilterChange}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="storeId"
          placeholder="Store ID"
          value={filters.storeId}
          onChange={handleFilterChange}
          className="border rounded-md p-2"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded-md p-2"
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={applyFilters}
          className="bg-[#971132] text-white px-4 py-2 rounded-md"
        >
          Apply Filters
        </button>
        <div className="flex gap-4">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FileSpreadsheet size={20} />
            Export CSV
          </button>
          <button
            onClick={downloadInvoices}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FileDown size={20} />
            Download Invoices
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  #{transaction.transaction_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(transaction.transaction_date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.user_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.store_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rs. {(Number(transaction.amount) || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsAdmin;

