import React from "react";
import { Outlet } from "react-router-dom";
import LoginImg from "../../assets/login_img.png";

function AuthLayout() {
  return (
    <div className="bg-gradient-to-b home-hero-section flex justify-center items-center h-screen text-[#333]">
      <div
        className="flex bg-white rounded-[20px] overflow-hidden max-w-[900px] w-full mx-3 md:mx-0"
        style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="p-10 flex-[1] flex flex-col justify-center">
          <Outlet />
        </div>

        <div className="flex-[1] bg-[#f5f5f5] hidden md:flex justify-center items-center p-8">
          <img src={LoginImg} alt="Sethu AI" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
