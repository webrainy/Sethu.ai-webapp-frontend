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
import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";

function AdminSidebar({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) {
  const location = useLocation();

  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      link: "/admin/dashboard",
    },
    {
      title: "Students",
      icon: <PiStudentFill />,
      link: "/admin/staff/list",
    },
   
  ];

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="lg"
      style={{backgroundColor:"#032313"}}
      // image={LoginBg}
      //   style={{ color: "white", backgroundColor: "#F5F7F900", border: "none" }}
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle" style={{ color: "white",backgroundColor:"#032313" }}>
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
                <p className="uppercase text-center text-[#b9b9b9] text-3xl">
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
                  ? "bg-[#00a76f14] text-[#00A76F]"
                  : "text-[#637381]"
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

export default AdminSidebar;
