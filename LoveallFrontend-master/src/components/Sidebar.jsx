import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="w-64 min-h-screen text-white"
      style={{
        background: "linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)",
      }}
    >
      <div className="p-6 text-center font-bold text-2xl">LoveAll</div>
      <nav className="flex flex-col p-4 space-y-6 mt-8">
        <NavLink to="/business" className={({ isActive }) => `p-2 rounded ${isActive ? "bg-[#971132]" : ""}`} end>Summary</NavLink>
        <NavLink to="/business/transactions" className={({ isActive }) => `p-2 rounded ${isActive ? "bg-[#971132]" : ""}`}>Transactions</NavLink>
        {/* <NavLink to="/business/analytics" className={({ isActive }) => `p-2 rounded ${isActive ? "bg-[#971132]" : ""}`}>Analytics</NavLink> */}
        <NavLink to="/business/offers" className={({ isActive }) => `p-2 rounded ${isActive ? "bg-[#971132]" : ""}`}>Your Offers</NavLink>
        <NavLink to="/business/feedback" className={({ isActive }) => `p-2 rounded ${isActive ? "bg-[#971132]" : ""}`}>Customer Feedback and Reviews</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;