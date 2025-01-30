import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../sidebars/StudentSidebar";
import { FaBars } from "react-icons/fa";

function StudentLayout() {
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
      <StudentSidebar
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

export default StudentLayout;
