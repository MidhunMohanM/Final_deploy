import React from "react";

const Transaction = () => {
  const userName = "Karthik Krishnamoorthi";
  const invoices = [
    { invoiceNo: "#AR-803481", status: "Completed" },
    { invoiceNo: "#AR-803482", status: "Completed" },
    { invoiceNo: "#AR-803483", status: "Cancelled" },
    { invoiceNo: "#AR-803484", status: "Completed" },
  ];
  const transactions = [
    { date: "March 1st, 2024", merchant: "Netflix", amount: "-Rs. 1999", savings: "+Rs. 100", type: "Subscription Renewal" },
    { date: "February 15th, 2024", merchant: "Apple Store", amount: "-Rs. 2500", savings: "+Rs. 150", type: "Purchase" },
    { date: "February 12th, 2024", merchant: "Xero Degrees", amount: "-Rs. 587", savings: "+Rs. 30", type: "Purchase" },
    { date: "February 10th, 2024", merchant: "BIBA", amount: "-Rs. 199", savings: "+Rs. 250", type: "Purchase" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transaction History</h1>

      {/* Card Section */}
      <div className="flex flex-wrap gap-8">
        <div className="bg-gradient-to-r from-pink-500 to-pink-300 p-6 rounded-lg shadow-lg text-white w-full md:w-1/3">
          <h2 className="text-lg font-semibold">Social Loyalty Card</h2>
          <div className="text-4xl font-bold my-4">•••• •••• •••• XXXX</div>
          <div className="text-2xl font-semibold">{userName}</div>
        </div>

        {/* Invoices Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Invoices</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 text-gray-500">Invoice No.</th>
                <th className="py-2 text-gray-500">Status</th>
                <th className="py-2 text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2">{invoice.invoiceNo}</td>
                  <td className="py-2">{invoice.status}</td>
                  <td className="py-2">
                    <button className="text-blue-500 hover:underline">PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <div className="flex items-center text-gray-600">
            <span className="material-icons mr-2">calendar_today</span> 
            <span>23-30th March 2024</span>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 text-gray-500">Date</th>
              <th className="py-2 text-gray-500">Merchant</th>
              <th className="py-2 text-gray-500">Amount</th>
              <th className="py-2 text-gray-500">Savings</th>
              <th className="py-2 text-gray-500">Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2">{transaction.date}</td>
                <td className="py-2">{transaction.merchant}</td>
                <td className="py-2">{transaction.amount}</td>
                <td className="py-2">{transaction.savings}</td>
                <td className="py-2">{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
