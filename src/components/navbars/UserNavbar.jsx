import React from "react";
// import Logo from "../../assets/sri_stya_sai_logo.jpg";
import SaiSymbol from "../../assets/sri_stya_sai_symbol.png";
import { Link } from "react-router-dom";

function UserNavbar() {
  return (
    <div className="flex justify-center bg-transparent">
      <div className="max-w-[1180px] w-full relative">
        <div className="absolute top-2 sm:top-10 z-[2] flex justify-between items-start w-full px-1">
          {/* <img src={Logo} alt="sethu.ai" className="w-[85px]" /> */}
          <img src={SaiSymbol} alt="sethu.ai" className="w-[85px]" />
          <div className="flex items-center gap-8 text-white font-myriad">
            <Link
              to={"/"}
              className={`${
                window.location.pathname === "/" ? "font-semibold" : "font-thin"
              }`}
            >
              Home
            </Link>
            <Link
              to={"/our_programs"}
              className={`${
                window.location.pathname === "/our_programs"
                  ? "font-semibold"
                  : "font-thin"
              }`}
            >
              Our Programs
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
