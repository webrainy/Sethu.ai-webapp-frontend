import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";

function Footer() {
  const date = new Date();

  return (
    <>
      <div className="bg-white flex flex-col justify-center items-center px-2 lg:px-0 py-24">
        <div className="grid grid-cols-2 gap-[65px]">
          <div className="text-center px-16 pt-8 pb-5 bg-gradient-to-tr from-[#f87e3d] to-[#e66465] text-white relative">
            <p className="text-5xl font-light">
              We're Here
              <br />
              to Help You
              <br />
              <span className="font-semibold">
                Every Step
                <br />
                of the Way
              </span>
            </p>
            <p className="pt-4 font-bold">
              Have questions? <br />
              Need more information? <br />
              Out team is ready to assist you.
            </p>

            <div className="absolute -right-[64px] bottom-0 border-l-[65px] border-l-[#ff5731] border-t-[45px] border-t-transparent border-b-[45px] border-b-transparent w-0 h-0"></div>
          </div>

          <div>
            <form className="flex flex-col gap-2">
              <Input
                className="text-center"
                variant="static"
                placeholder="Phone"
                type="tel"
              />
              <Input
                className="text-center"
                variant="static"
                placeholder="Email"
                type="email"
              />
              <Textarea
                variant="static"
                className="text-center"
                placeholder="Message"
              />

              <div className="flex justify-center items-center mt-3">
                <Button
                  type="submit"
                  className="capitalize w-fit border py-1 px-12 text-[13px] font-normal rounded-[5px] hover:font-bold hover:rounded-full transition-all outline-none shadow-none hover:shadow-none border-[#ff5731] hover:border-none hover:bg-[#ff5731] hover:text-white bg-transparent text-[#ff5731]"
                >
                  Register Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-red-500 flex flex-col justify-center items-center px-2 lg:px-0 pt-12 pb-8">
        <div className="max-w-[1180px] w-full grid grid-cols-1 sm:grid-cols-2 text-white gap-7 sm:gap-1 pb-10">
          <div>
            <p>
              Empowering youth through skill development, <br /> value-based
              education, and selfless service <br />
              inspired by the teachings of Bhagawan <br />
              Sri Sathya Sai Baba.
            </p>
          </div>
          <div className="text-left sm:text-right flex flex-col gap-1 sm:gap-3">
            <p className="text-3xl md:text-5xl font-semibold">
              +91 00000 00000
            </p>
            <p className="text-base md:text-xl">
              Classes near Khairtabad Metro Station, Hyderbad.
            </p>
            <p>enquiry@trust.in</p>
          </div>
        </div>

        <hr className="max-w-[1180px] w-full" />

        <div className="text-center pt-2 text-white">
          <p>
            © {date.getFullYear()} Sri Sathya Sai Seva Organisations - Hyderbad
            Boys. All rights Reserved | Terms & Conditions | Privacy Policy
          </p>
          <p>
            Designed & Developed by{" "}
            <span className="font-semibold">White Thoughts and Branding</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
