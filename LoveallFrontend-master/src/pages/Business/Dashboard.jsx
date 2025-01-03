import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  // Line chart data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(147, 51, 74)",
        tension: 0.3,
      },
      {
        label: "Social Impact",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.3,
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ["Food", "Drinks", "Snacks", "Others"],
    datasets: [
      {
        data: [30, 25, 25, 20],
        backgroundColor: [
          "rgb(147, 51, 74)",
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Offers Chosen",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgb(147, 51, 74)",
      },
    ],
  };

  // Horizontal bar data
  const horizontalBarData = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Profit",
        data: [65, 59, 80, 81],
        backgroundColor: "rgb(147, 51, 74)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="flex gap-2 mb-4 font-bold">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9439 0.0859375C23.336 0.0859375 25.8155 2.57709 25.8284 6.96921V19.0311C25.8284 23.4219 23.336 25.9144 18.9439 25.9144H6.88328C2.49115 25.9144 0 23.4219 0 19.0311V6.96921C0 2.57709 2.49115 0.0859375 6.88328 0.0859375H18.9439ZM13.5599 5.41951C13.197 5.19997 12.758 5.19997 12.4106 5.41951C12.0606 5.63776 11.8682 6.03939 11.9056 6.43973V19.5993C11.9715 20.1546 12.4351 20.5679 12.9775 20.5679C13.5341 20.5679 13.9977 20.1546 14.0494 19.5993V6.43973C14.101 6.03939 13.9086 5.63776 13.5599 5.41951ZM7.52899 9.65537C7.1803 9.43583 6.73993 9.43583 6.39254 9.65537C6.04256 9.87491 5.85014 10.274 5.88888 10.6756V19.5993C5.93925 20.1546 6.40416 20.5679 6.95947 20.5679C7.51607 20.5679 7.97969 20.1546 8.03135 19.5993V10.6756C8.07139 10.274 7.87638 9.87491 7.52899 9.65537ZM19.4863 14.3432C19.1389 14.1237 18.6998 14.1237 18.3382 14.3432C17.9882 14.5628 17.7958 14.9489 17.8474 15.3635V19.5993C17.8991 20.1546 18.3627 20.5679 18.9193 20.5679C19.4617 20.5679 19.9253 20.1546 19.9912 19.5993V15.3635C20.0287 14.9489 19.8362 14.5628 19.4863 14.3432Z"
            fill="#161010"
          />
        </svg>
        Analytics
      </h2>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">27.10</p>
              <p className="ml-2 flex items-center text-sm text-green-600">
                +2.5%
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-500">from last month</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-sm font-medium text-gray-500">
              Total Customers
            </h3>
            <div className="mt-2">
              <p className="text-2xl font-semibold">5,896</p>
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-sm font-medium text-gray-500">
              Social Impact Score
            </h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">89.7</p>
              <p className="ml-2 flex items-center text-sm text-green-600">
                +5.4%
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-500">from last month</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">Rs. 1,34,500</p>
              <p className="ml-2 flex items-center text-sm text-green-600">
                +8.2%
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-500">from last month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-lg font-medium mb-4">Sales vs Social Impact</h3>
            <div className="h-[300px]">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-lg font-medium mb-4">
              Customer Spending Distribution
            </h3>
            <div className="h-[300px]">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-lg font-medium mb-4">Most Chosen Offers</h3>
            <div className="h-[300px]">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-lg font-medium mb-4">
              Average of All Profits Made
            </h3>
            <div className="h-[300px]">
              <Bar
                data={horizontalBarData}
                options={{
                  ...chartOptions,
                  indexAxis: "y",
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-medium mb-4">
            Store and Customer Reviews
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Food Safety</span>
                <span>74% Correct</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: "74%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Compliance Basics Procedures</span>
                <span>52% Correct</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: "52%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Company Networking</span>
                <span>38% Correct</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: "38%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
