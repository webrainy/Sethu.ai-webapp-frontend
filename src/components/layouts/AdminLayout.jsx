import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../sidebars/AdminSidebar";
import { FaBars } from "react-icons/fa";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("sethu_admin_access_token")) {
      navigate("/login");
    }
  }, [navigate]);

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
      <main className="bg-gray-100">
        <div className="px-4 py-3">
          <FaBars
            className="btn-toggle"
            onClick={() => handleToggleSidebar(true)}
          />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
