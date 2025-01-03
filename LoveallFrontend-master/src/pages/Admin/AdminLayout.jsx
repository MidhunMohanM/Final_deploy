import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

