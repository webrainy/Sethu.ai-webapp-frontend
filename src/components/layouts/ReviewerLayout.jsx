import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ReviewerSidebar from "../sidebars/ReviewerSidebar";
import { FaBars } from "react-icons/fa";

function ReviewerLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("sethu_reviewer_access_token")) {
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
      <ReviewerSidebar
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

export default ReviewerLayout;
