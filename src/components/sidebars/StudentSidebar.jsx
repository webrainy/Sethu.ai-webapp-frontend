import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { SiGoogleclassroom, SiGooglemeet } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

function StudentSidebar({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: <SiGoogleclassroom />,
      link: "/student/dashboard",
    },
    {
      title: "Assignments",
      icon: <SiGoogleclassroom />,
      link: "/student/assignment",
    },
    // {
    //   title: "Notifications",
    //   icon: <MdNotifications />,
    //   link: "/student/notification",
    // },
    {
      title: "Events",
      icon: <SiGoogleclassroom />,
      link: "/student/events",
    },
    // {
    //   title: "Interviews",
    //   icon: <SiGooglemeet />,
    //   link: "/student/interviews",
    // },
    {
      title: "Profile",
      icon: <CgProfile />,
      link: "/student/profile",
    },
  ];

  const handleStudentLogout = () => {
    localStorage.removeItem("sethu_student_access_token");
    navigate("/login");
  };

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
          <MenuItem
            icon={<LuLogOut />}
            onClick={() => handleStudentLogout()}
            className="text-[#637381] font-ddin"
          >
            Logout
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}

export default StudentSidebar;
