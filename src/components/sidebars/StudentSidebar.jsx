import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { CgProfile } from "react-icons/cg";

function StudentSidebar({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) {
  const location = useLocation();

  const sidebarMenu = [
    {
      title: "Batch",
      icon: <SiGoogleclassroom />,
      link: "/student/batch",
    },
    {
      title: "Notifications",
      icon: <MdNotifications />,
      link: "/student/notification",
    },

    {
      title: "Profile",
      icon: <CgProfile />,
      link: "/student/profile",
    },
  ];

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="lg"
      style={{ backgroundColor: "#032313" }}
      // image={LoginBg}
      //   style={{ color: "white", backgroundColor: "#F5F7F900", border: "none" }}
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
                  // padding: "9px",
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
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}

export default StudentSidebar;
