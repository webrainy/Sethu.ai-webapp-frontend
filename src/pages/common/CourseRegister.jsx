import React from "react";
import { Outlet } from "react-router-dom";
import LoginImg from "../../assets/orange_bg.jpg";

function CourseRegister() {
  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${LoginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-auto max-w-4xl shadow-2xl flex flex-col items-center justify-center py-8 pb-3 px-3 bg-white">
        <div className="w-72 lg:w-96 mb-8 text-center">
          <p className="font-bold text-xl sm:text-4xl text-gray-500 uppercase">
            Python Data Engineer{" "}
            <span className="font-bold text-xl sm:text-4xl text-black uppercase">
              {" "}
              Training
            </span>
          </p>

          <p className="tracking-[3px] text-gray-500 text-xs sm:text-base">
            Registration Form
          </p>
        </div>
        <div className="w-72 lg:w-96 text-center">
          <p className="text-gray-500">
            Thank you for getting back, please log in to your account by filling
            out this form:
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default CourseRegister;
