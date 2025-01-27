import { Button } from "@material-tailwind/react";
import React from "react";
import Footer from "../../components/common/Footer";

function UserHomePage() {
  return (
    <>
      <div className="bg-red-400 flex flex-col justify-center items-center px-2 lg:px-0">
        <div className="max-w-[1180px] w-full h-screen flex justify-center flex-col text-white gap-1">
          <p className="text-4xl sm:text-6xl">Where Skills</p>
          <p className="text-4xl sm:text-6xl">Meet Values,</p>
          <p className="text-4xl sm:text-6xl font-semibold text-yellow-400">
            Futures Flourish
          </p>
          <p className="text-[13px] sm:text-[15px]">
            Unlocking potential through skills, values, and service <br />
            inspired by the teachings of{" "}
            <span className="font-bold">Bhagawan Sri Sathya Sai Baba.</span>
          </p>
          <div className="flex gap-3 mt-3">
            <Button className="capitalize border py-2 px-4 hover:px-3 text-[13px] font-normal rounded-[5px] hover:font-bold hover:rounded-full transition-all outline-none bg-transparent shadow-none hover:shadow-none hover:bg-deep-orange-300">
              Discover our programs
            </Button>
            <Button className="capitalize border py-2 px-12 text-[13px] font-normal rounded-[5px] hover:font-bold hover:rounded-full transition-all outline-none bg-transparent shadow-none hover:shadow-none">
              Register
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserHomePage;
