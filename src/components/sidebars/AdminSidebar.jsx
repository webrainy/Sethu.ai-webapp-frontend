import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MdOutlineReviews, MdSpaceDashboard } from "react-icons/md";
import { SiGoogleclassroom, SiGooglemeet } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";
import { RiLockPasswordLine } from "react-icons/ri";

function AdminSidebar({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");
  const [decoded, setDecoded] = useState();

  useEffect(() => {
    if (access_token) {
      setDecoded(jwtDecode(access_token));
    }
  }, [access_token]);

  // Define sidebar menu items
  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      link: "/admin/dashboard",
    },
    {
      title: "Batch",
      icon: <SiGoogleclassroom />,
      link: "/admin/manage_batch",
    },
    {
      title: "Student",
      icon: <PiStudentFill />,
      link: "/admin/students",
    },
    // Conditionally include "Admins" menu item based on role
    ...(decoded?.role !== 4
      ? [
          {
            title: "Admins",
            icon: <MdOutlineReviews />,
            link: "/admin/manage_admins",
          },
        ]
      : []),
    {
      title: "Reviewers",
      icon: <MdOutlineReviews />,
      link: "/admin/manage_reviewers",
    },
    {
      title: "Events/Classes",
      icon: <SiGoogleclassroom />,
      link: "/admin/manage_events",
    },
    {
      title: "Reset Password",
      icon: <RiLockPasswordLine />,
      link: "/admin/reset_password",
    },
  ];

  const handleAdminLogout = () => {
    localStorage.removeItem("sethu_admin_access_token");
    navigate("/login");
  };

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="lg"
      style={{ backgroundColor: "#032313" }}
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle" style={{ color: "white" }}>
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight style={{ color: "#BDBDBD" }} />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft style={{ color: "#BDBDBD" }} />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                  color: "white",
                }}
              >
                <p className="uppercase text-center text-[#E68242] text-3xl font-ddin">
                  Sethu ai
                </p>
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          {sidebarMenu.map((item, i) => (
            <MenuItem
              icon={item.icon}
              key={i}
              onClick={() => handleToggleSidebar(false)}
              className={`${
                location.pathname === item.link
                  ? "bg-[#00a76f14] text-[#FF9D23] font-ddin"
                  : "text-[#637381] font-ddin"
              }`}
            >
              {item.title}
              <NavLink to={item.link} />
            </MenuItem>
          ))}
          <MenuItem
            icon={<LuLogOut />}
            onClick={() => handleAdminLogout()}
            className="text-[#637381] font-ddin"
          >
            Logout
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          borderTop: !collapsed ? "1px solid #E68242" : "none",
          padding: "8px 0",
        }}
      >
        {!collapsed && (
          <div className="font-ddin">
            {decoded?.name && (
              <p className="text-black font-semibold text-[21px]">
                {decoded?.name || ""}
              </p>
            )}
            {decoded && <p>{decoded?.phone || ""}</p>}
            {decoded && <p>{decoded?.email || ""}</p>}
          </div>
        )}
      </SidebarFooter>
    </ProSidebar>
  );
}

export default AdminSidebar;
