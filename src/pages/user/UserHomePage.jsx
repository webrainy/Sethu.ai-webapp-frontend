import { Button } from "@material-tailwind/react";
import React from "react";
import Footer from "../../components/common/Footer";
import SecondSecBg from "../../assets/nurturing_tomorrow.png";

function UserHomePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center px-2 lg:px-0 home-hero-section">
        <div className="max-w-[1180px] w-full h-[60vh] sm:h-screen flex justify-center flex-col text-white gap-1">
          <p className="text-4xl sm:text-7xl font-ddin">Where Skills</p>
          <p className="text-4xl sm:text-7xl font-ddin">Meet Values,</p>
          <p className="text-4xl sm:text-7xl font-semibold font-ddin text-yellow-400">
            Futures Flourish
          </p>
          <p className="text-[13px] sm:text-[15px] font-myriad font-light">
            Unlocking potential through skills, values, and service <br />
            inspired by the teachings of{" "}
            <span className="font-bold">Bhagawan Sri Sathya Sai Baba.</span>
          </p>
          <div className="flex gap-3 mt-3">
            <Button className="capitalize font-myriad font-light border-2 border-[#E68242] py-2 px-4 hover:px-3 text-[13px] rounded-[5px] hover:font-bold hover:rounded-full transition-all outline-none bg-transparent shadow-none hover:shadow-none hover:bg-[#E68242]">
              Discover our programs
            </Button>
            <Button className="capitalize font-myriad border border-[#B99F6A] py-2 px-12 text-[13px] font-light rounded-[5px] hover:font-bold hover:rounded-full transition-all outline-none bg-transparent hover:bg-[#B99F6A] shadow-none hover:shadow-none">
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="h-[50vh] lg:h-[85vh] grid grid-cols-2 items-end">
        <div>
          <img src={SecondSecBg} alt="sethu ai" className="object-cover" />
        </div>
        <div>
          <p>
            Nurturing <br />
            <span>Tomorrow's Leaders</span>
          </p>
          <p>
            At the Sri Sathya Sai Skill Development Program our mission is to
            provide
            <br />
            unemployed youth with professional skills, instill value-based
            education,
            <br />
            and inspire selfless service. Through this holistic approach, we are
            <br />
            cultivating a generation of compossionate and capable leaders,
            equipped
            <br />
            to transform their communities and contribute to building the
            nation.
          </p>
        </div>
      </div>

      <div className="h-[50vh] lg:h-[85vh] relative">
        <video
          src="assets/ready_to_transform_low.mp4"
          autoPlay
          muted
          loop
          className="w-full absolute top-0 -z-[1] h-[50vh] lg:h-[80vh] object-cover"
        ></video>

        <div className="flex flex-col gap-3 justify-center items-center relative z-10 text-white h-full text-center">
          <p className="text-3xl sm:text-4xl lg:text-6xl text-amber-900 font-ddin">
            Ready to Transform Your{" "}
            <span className="font-semibold">Future?</span>
          </p>
          <p className="font-semibold text-[19px] sm:text-[21px] text-red-500 font-myriad">
            Register Now and Begin Your Journey
          </p>
          <p className="text-center text-[13px] sm:text-[15px] text-[#2C2C2C] font-myriad font-light">
            Take the first step toward a brighter future with the Sri Sathya Sai
            Skill Development
            <br className="hidden sm:block" /> Program. Our doors are open to
            youth eager to learn, grow and make a difference.
          </p>
          <Button className="capitalize font-myriad font-light hover:font-semibold border py-2 px-12 text-[13px] text-[#DD4633] hover:text-white rounded-[5px] hover:rounded-full transition-all outline-none bg-transparent hover:bg-[#DD4633] shadow-none hover:shadow-none border-[#DD4633]">
            Register
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserHomePage;
