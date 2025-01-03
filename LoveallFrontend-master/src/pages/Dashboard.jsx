import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
  { name: 'Fashion', value: 3984, color: '#FFB6C1' },
  { name: 'Entertainment', value: 169, color: '#FF69B4' },
  { name: 'Travel', value: 4342, color: '#FF1493' },
  { name: 'Others', value: 2142, color: '#C71585' },
];

const savingsData = [
  { name: 'Jan', value: 200 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 389 },
  { name: 'Jun', value: 489 },
  { name: 'Jul', value: 349 },
  { name: 'Aug', value: 401 },
  { name: 'Sep', value: 300 },
  { name: 'Oct', value: 200 },
  { name: 'Nov', value: 278 },
  { name: 'Dec', value: 420 },
];

const data = [
  { title: 'Volunteer', value: '6 events', subtext: '+2 since last month', color: 'bg-pink-100' },
  { title: 'Donate', value: 'Rs. 230', subtext: '-Rs. 18 since last month', color: 'bg-pink-100' },
  { title: 'Transaction History', value: 'Rs. 2337 spent', subtext: '+255 since last month', color: 'bg-pink-100' },
  { title: 'Favorites', value: '5 Favourites', subtext: '+3 new', color: 'bg-pink-100' },
];

export default function Dashboard() {
  return (
    <div className="bg-white p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Manage Your Love All Card and Track Your Impact!</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div key={index} className={`${item.color} rounded-lg p-4 relative`}>
              <button className="absolute top-2 right-2 text-pink-600">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              <h3 className="font-semibold text-pink-800">{item.title}</h3>
              <p className="text-2xl font-bold text-pink-900 my-2">{item.value}</p>
              <p className="text-sm text-pink-700">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-pink-800">Activity</h2>
          <div className="bg-pink-900 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFC0CB" />
                <XAxis dataKey="name" stroke="#FFC0CB" />
                <YAxis stroke="#FFC0CB" />
                <Tooltip />
                <Bar dataKey="value" fill="#FF69B4" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {activityData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-pink-100">{item.name}</span>
                  <span className="ml-auto text-pink-100">Rs. {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-pink-800">Savings over time</h2>
          <div className="bg-white rounded-lg p-4 border border-pink-200">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFC0CB" />
                <XAxis dataKey="name" stroke="#FF69B4" />
                <YAxis stroke="#FF69B4" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#FF1493" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-pink-200">
        <h2 className="text-2xl font-bold text-pink-800 mb-2">Rs. 996 saved so far!</h2>
        <p className="text-pink-600 mb-4">You've saved Rs. 996 so far! Continue using your card to unlock more savings with every purchase.</p>
        <button className="w-full bg-pink-800 text-white py-3 rounded-lg font-semibold hover:bg-pink-900 transition duration-300">
          View Saving Details
        </button>
      </div>
    </div>
  );
}