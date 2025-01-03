import React, { useState, useEffect, useCallback } from "react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Calendar, Grid, Users, ShoppingBag } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../utils/tokenManager";

const DashboardAdmin = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    offerType: '',
    businessType: ''
  });

  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const api = process.env.REACT_APP_API_URL;

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = getToken('admin_auth_token');
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${api}/admin/dashboard?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setDashboardData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api, filters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, fetchDashboardData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    fetchDashboardData();
  };

  if (!isAuthenticated) {
    return <div>Please log in to view the dashboard.</div>;
  }

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Platform Analytics Dashboard</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Offer Type</label>
          <select
            name="offerType"
            value={filters.offerType}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Offers</option>
            <option value="discount">Discount</option>
            <option value="cashback">Cashback</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Business Type</label>
          <select
            name="businessType"
            value={filters.businessType}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Types</option>
            <option value="restaurant">Restaurant</option>
            <option value="retail">Retail</option>
            <option value="service">Service</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-[#971132] text-white rounded-md hover:bg-[#7d0e2a]"
        >
          Apply Filters
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#971132] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-2">Total Users</p>
              <p className="text-2xl font-bold">{dashboardData.totalUsers} users</p>
            </div>
            <Users className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-[#971132] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-2">Active Businesses</p>
              <p className="text-2xl font-bold">{dashboardData.activeBusinesses} businesses</p>
            </div>
            <ShoppingBag className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-[#971132] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-2">Total Transactions</p>
              <p className="text-2xl font-bold">{dashboardData.totalTransactions} transactions</p>
            </div>
            <Calendar className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-[#971132] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-2">Total Offers</p>
              <p className="text-2xl font-bold">{dashboardData.totalOffers} offers</p>
            </div>
            <Grid className="h-8 w-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Weekly Activity Expenditures</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#971132" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Businesses */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top 3 Businesses</h2>
          <div className="space-y-4">
            {dashboardData.topBusinesses.map((business, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{business.store_name}</p>
                    <p className="text-sm text-gray-500">{business.transactions} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-500">Rs. {parseFloat(business.revenue).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Business Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Business Category Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.categoryDistribution}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#971132"
                  label
                >
                  {dashboardData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#FF6B6B', '#FFB6B6', '#971132', '#4A0014', '#FF9999'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#971132"
                  fill="rgba(151, 17, 50, 0.1)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

