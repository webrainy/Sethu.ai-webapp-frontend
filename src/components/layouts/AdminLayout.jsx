import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../sidebars/AdminSidebar";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? "toggled" : ""} bg-zinc-100`}>
      <AdminSidebar
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      {/* <AdminNavbar
      collapsed={collapsed}
      handleToggleSidebar={handleToggleSidebar}
    /> */}
      <main
        className={`bg-white pt-[50px] lg:pt-[70px] transition-all duration-300`}
      >
        <div className="p-2 px-3 md:px-5 pt-3 pb-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
