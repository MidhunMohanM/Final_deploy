import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Download, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '../../utils/tokenManager';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({
    totalAmount: '0',
    completedTransactions: 0,
    pendingTransactions: 0,
    averageAmount: '0'
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authState} = useAuth();
  const { isAuthenticated } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    } else {
      fetchTransactions();
    }
  }, [isAuthenticated, navigate, filter]);

  const fetchTransactions = async () => {
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        navigate('/', { replace: true });
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/transaction`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filter })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch transactions');
      }
    
      const data = await response.json();
    
      setTransactions(data.transactions);
      setMetrics(data.metrics);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/export-csv`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to export CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownloadInvoices = async () => {
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/download-invoices`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download invoices');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'invoices.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <ArrowUpRight className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Transaction Amount', value: `Rs. ${parseFloat(metrics.totalAmount).toLocaleString('en-IN')}` },
          { title: 'Completed Transactions', value: metrics.completedTransactions },
          { title: 'Pending Transactions', value: metrics.pendingTransactions },
          { title: 'Average Transaction Value', value: `Rs. ${parseFloat(metrics.averageAmount).toLocaleString('en-IN')}` }
        ].map((metric, index) => (
          <div
            key={index}
            className="p-4 rounded-lg text-white"
            style={{
              background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
            }}
          >
            <h3 className="text-sm opacity-90 mb-2">{metric.title}</h3>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            {/*Removed filter buttons as requested*/}
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-gray-600" onClick={handleExportCSV}>
              <FileSpreadsheet className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 text-gray-600" onClick={handleDownloadInvoices}>
              <Download className="w-4 h-4" />
              Download Invoices
            </button>
            <select className="border rounded px-2 py-1 text-gray-600">
              <option>Status: All</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-4">Transaction ID</th>
                <th className="pb-4">Transaction Date</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Discount Applied</th>
                <th className="pb-4">After Discount Price</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((transaction) => (
                <tr key={transaction.transaction_id} className="text-sm">
                  <td className="py-4">{transaction.transaction_id}</td>
                  <td className="py-4">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                  <td className="py-4">₹{parseFloat(transaction.amount).toFixed(2)}</td>
                  <td className="py-4">
                    {transaction.discount_applied ? `₹${parseFloat(transaction.discount_applied).toFixed(2)}` : '-'}
                  </td>
                  <td className="py-4">
                    ₹{(parseFloat(transaction.amount) - parseFloat(transaction.discount_applied || 0)).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;

