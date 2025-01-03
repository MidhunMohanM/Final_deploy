import React from "react";
import { NavLink } from "react-router-dom";
import { Home, FileText, Users, Wrench, Award, Settings } from 'lucide-react';

const SidebarAdmin = () => {
  return (
    <aside
      className="w-64 min-h-screen text-white"
      style={{
        background: "linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)",
      }}
    >
      <div className="p-6 text-center font-bold text-2xl">LOVE ALL</div>
      <nav className="flex flex-col p-4 space-y-6 mt-8">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => `p-2 rounded flex items-center gap-3 ${isActive ? "bg-[#971132]" : ""}`}
        >
          <Home size={20} />
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin/transactions" 
          className={({ isActive }) => `p-2 rounded flex items-center gap-3 ${isActive ? "bg-[#971132]" : ""}`}
        >
          <FileText size={20} />
          Transactions
        </NavLink>
        <NavLink 
          to="/admin/accounts" 
          className={({ isActive }) => `p-2 rounded flex items-center gap-3 ${isActive ? "bg-[#971132]" : ""}`}
        >
          <Users size={20} />
          Accounts
        </NavLink>
        <NavLink 
          to="/admin/services" 
          className={({ isActive }) => `p-2 rounded flex items-center gap-3 ${isActive ? "bg-[#971132]" : ""}`}
        >
          <Wrench size={20} />
          Services
        </NavLink>
        {/* <NavLink 
          to="/admin/privileges" 
          className={({ isActive }) => `p-2 rounded flex items-center gap-3 ${isActive ? "bg-[#971132]" : ""}`}
        >
          <Award size={20} />
          My Privileges
        </NavLink> */}
        <NavLink 
          to="/admin/settings" 
          className={({ isActive }) => `p-2 rounded flex items-center gap-3 ${isActive ? "bg-[#971132]" : ""}`}
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;

