import { Button } from "@material-tailwind/react";
import React, { useRef } from "react";
import Footer from "../../components/common/Footer";
import SecondSecBg from "../../assets/nurturing_tomorrow.png";
import BridgingSvg from "../../assets/bridging_the_gap_between.svg";
import FosteringSvg from "../../assets/fostering_character.svg";
import RevitalizingSvg from "../../assets/revitalizing_rural.svg";
import UpArrowSvg from "../../assets/up_arrow.svg";
import EmpoweringYouthImg from "../../assets/empowering_youth.jpg";
import RevitalisingEducationImg from "../../assets/revitalising_education.jpg";
import EngageOrientSvg from "../../assets/engage_orient.svg";
import MasterTechnicalSvg from "../../assets/master_technical_skills.svg";
import DevelopSoftSkillsSvg from "../../assets/develop_soft_skills.svg";
import InspireValuesSvg from "../../assets/inspire_through_values.svg";
import PlacementCareerSvg from "../../assets/placement_career_support.svg";
import BlogThumbnailImg from "../../assets/blog_thumbnail.jpg";
import DownArrowSvg from "../../assets/down_arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import UserNavbar from "../../components/navbars/UserNavbar";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
  const ref = useRef(null);
  const navigate = useNavigate();

  const ScrollToNextSection = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <UserNavbar />

      <div className="flex flex-col justify-center items-center px-2 lg:px-0 home-hero-section">
        <div className="max-w-[1180px] w-full h-[60vh] sm:h-screen flex justify-center flex-col text-white gap-1 relative">
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
            <Button
              onClick={() => navigate("/course_registration")}
              className="capitalize font-myriad border border-[#B99F6A] py-2 px-12 text-[13px] font-light rounded-[5px] hover:font-bold hover:rounded-full transition-all outline-none bg-transparent hover:bg-[#B99F6A] shadow-none hover:shadow-none"
            >
              Register
            </Button>
          </div>
          <div className="absolute right-0 bottom-10">
            <img
              src={DownArrowSvg}
              alt="sethu.ai"
              className="cursor-pointer w-10 sm:w-auto"
              onClick={ScrollToNextSection}
            />
          </div>
        </div>
      </div>

      {/* second section */}
      <div
        ref={ref}
        className="flex items-center justify-center px-5 lg:px-0"
        id="second-section"
      >
        <div className="max-w-[1180px] w-full flex items-center lg:items-end flex-col lg:flex-row">
          <img src={SecondSecBg} alt="sethu.ai" />
          <div className="pb-10 lg:-ml-10">
            <p className="font-ddin text-4xl sm:text-5xl md:text-[62px]/[55px] text-[#E68242]">
              Nurturing <br />
              <span className="font-semibold">Tomorrow's Leaders</span>
            </p>
            <p className="font-myriad font-light text-base md:text-lg">
              At the Sri Sathya Sai Skill Development Program our mission is to
              provide <br className="hidden xl:block" />
              unemployed youth with professional skills, instill value-based
              education, <br className="hidden xl:block" />
              and inspire selfless service. Through this holistic approach, we
              are
              <br className="hidden xl:block" />
              cultivating a generation of compossionate and capable leaders,
              equipped <br className="hidden xl:block" />
              to transform their communities and contribute to building the
              nation.
            </p>
          </div>
        </div>
      </div>

      {/* third section */}
      <div className="px-5 lg:px-0 home-third-sec flex justify-center">
        <div className="max-w-[1180px] w-full h-full">
          <p className="capitalize text-center text-white text-4xl sm:text-5xl md:text-[62px]/[55px] font-light font-ddin py-12">
            What we <span className="font-semibold">do</span>
          </p>
          <div className="flex items-center justify-center flex-col md:flex-row gap-5 pb-20 md:pb-32 md:h-[690px] relative">
            {/* 1st card */}
            <div className="flex items-start flex-col justify-end h-full gap-1 md:gap-2">
              <img src={BridgingSvg} alt="sethu.ai" className="w-12 md:w-16" />
              <p className="text-[#FFE200] text-lg md:text-xl font-semibold font-myriad">
                Bridging the Gap Between
                <br /> Industry and Opportunity
              </p>
              <p className="text-sm md:text-base font-myriad font-light text-white">
                We provide essential skill-based training that
                <br className="hidden lg:block" /> directly addresses
                unemployment, preparing
                <br className="hidden lg:block" /> youth for the demands of the
                modern workforce.
              </p>
            </div>

            {/* 2nd card */}
            <div className="flex items-start justify-center flex-col h-full gap-1 md:gap-2">
              <img src={FosteringSvg} alt="sethu.ai" className="w-12 md:w-16" />
              <p className="text-[#FFE200] text-lg md:text-xl font-semibold font-myriad">
                Fostering Character
                <br className="hidden lg:block" /> through Compassion
              </p>
              <p className="text-sm md:text-base font-myriad font-light text-white">
                Our value-based education nurtures not just
                <br className="hidden lg:block" /> careers, but
                characters—grounding students in
                <br className="hidden lg:block" /> ethics, empathy, and the
                spirit of service.
              </p>
            </div>

            {/* 3rd card */}
            <div className="flex items-start justify-start flex-col h-full gap-1 md:gap-2">
              <img
                src={RevitalizingSvg}
                alt="sethu.ai"
                className="w-12 md:w-16"
              />
              <p className="text-[#FFE200] text-lg md:text-xl font-semibold font-myriad">
                Revitalizing Rural Communities
              </p>
              <p className="text-sm md:text-base font-myriad font-light text-white">
                Through our rural development initiatives, we
                <br className="hidden lg:block" /> are revitalizing schools and
                uplifting
                <br className="hidden lg:block" /> communities, ensuring that
                education and
                <br className="hidden lg:block" /> growth reach even the most
                remote areas.
              </p>
            </div>

            <img
              src={UpArrowSvg}
              alt="sethu.ai"
              className="absolute left-[28%] bottom-[40%] h-[140px] hidden lg:block"
            />
            <img
              src={UpArrowSvg}
              alt="sethu.ai"
              className="absolute right-[38%] top-[14%] h-[140px] hidden lg:block"
            />
          </div>
        </div>
      </div>

      {/* fourth section */}
      <div className="px-5 lg:px-0 flex justify-center">
        <div className="max-w-[1180px] w-full h-full py-16">
          <p className="text-center text-[#E68242] font-ddin text-[34px]/[32px] sm:text-5xl md:text-[62px]/[55px] font-light">
            Every Day is a Chance at
            <br />
            <span className="font-semibold">Something Better</span>
          </p>

          <div className="grid lg:grid-cols-2 items-center gap-5 lg:gap-3 mt-5 sm:mt-8">
            <div className="flex flex-col gap-2">
              <img src={EmpoweringYouthImg} alt="sethu.ai" />
              <p className="text-2xl/6 text-[#DD4633] font-semibold font-myriad">
                Empowering Youth,
                <br /> One Success Story at a Time
              </p>
              <p className="text-[19px] font-myriad text-[#2C2C2C] font-light">
                Our training programs have positively impacted [Insert Number]
                young people, helping them secure employment in leading
                companies. Each individual we train and place is a testament to
                the transformative power of combining skill development with
                value-based education.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <img src={RevitalisingEducationImg} alt="sethu.ai" />
              <p className="text-2xl/6 text-[#DD4633] font-semibold font-myriad">
                Revitalising Education
                <br /> with Purpose
              </p>
              <p className="text-[19px] font-myriad text-[#2C2C2C] font-light">
                By blending technical expertise, soft skills,
                <br className="hidden lg:block" /> and values, we have redefined
                skill education, producing well-rounded
                <br className="hidden lg:block" /> individuals ready to
                contribute to society with competence
                <br className="hidden lg:block" /> and compassion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* fifth section */}
      <div className="px-5 lg:px-0 flex justify-center">
        <div className="max-w-[1180px] w-full h-full pt-8 pb-24">
          <p className="text-center text-[#E68242] font-ddin text-[30px]/[32px] sm:text-5xl md:text-[62px]/[55px] font-light">
            A Comprehensive Journey <br />
            from <span className="font-semibold">Learning to Leadership</span>
          </p>
          <p className="text-center text-[19px]/[22px] mt-4 font-myriad font-light">
            Our program is thoughtfully designed to nurture youth every step of
            the way:
          </p>
          <div className="flex flex-col md:flex-row justify-center flex-wrap gap-6 mt-8">
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img src={EngageOrientSvg} alt="sethu.ai" className="w-[85px]" />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Engage & Orient
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Students are welcomed through an immersive orientation, setting
                the stage for holistic growth.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={MasterTechnicalSvg}
                alt="sethu.ai"
                className="w-[85px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Master Technical Skills
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Hands-on learning in Python, SQL, Power BI, and more equips
                students with in-demand skills.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={DevelopSoftSkillsSvg}
                alt="sethu.ai"
                className="w-[85px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Develop Soft Skills
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Workshops in communication, leadership, and teamwork ensure
                personal and professional growth.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img src={InspireValuesSvg} alt="sethu.ai" className="w-[85px]" />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Inspire through Values
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Grounded in Swamy's teachings, our value-based sessions instill
                purpose, ethics, and social responsibility.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={PlacementCareerSvg}
                alt="sethu.ai"
                className="w-[85px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Placement & Career Support
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Upon completion, we provide placement assistance, connecting
                students with our industry partners to launch successful
                careers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* sixth section */}
      <div className="px-5 lg:px-0 flex justify-center blog-section">
        <div className="max-w-[1180px] w-full h-full py-36">
          <p className="text-center text-[#E68242] font-ddin text-[30px]/[32px] sm:text-5xl md:text-[62px]/[55px] font-light mb-12">
            Blog
          </p>
          <div>
            <Swiper
              slidesPerView={3}
              centeredSlides={false}
              slidesPerGroupSkip={1}
              grabCursor={true}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                1200: {
                  slidesPerView: 3,
                  slidesPerGroup: 2,
                },
                769: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                300: {
                  slidesPerView: 1,
                  slidesPerGroup: 2,
                },
              }}
              scrollbar={false}
              modules={[Keyboard, Scrollbar]}
              className="mySwiper"
            >
              {Array.from({ length: 5 }).map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="px-2 flex flex-col gap-1">
                    <img src={BlogThumbnailImg} alt="sethu.ai" />
                    <div className="flex justify-between items-center text-[#FFE200] font-myriad font-semibold text-xl">
                      <p>[Event Name]</p>
                      <p>Date</p>
                    </div>
                    <p className="text-white font-myriad font-light">
                      a sentence about the event, Date
                    </p>
                    <Button className="bg-transparent text-left text-lg capitalize font-myriad font-semibold w-fit px-0 py-0 mt-3 rounded-none shadow-none hover:shadow-none">
                      Read Blog
                    </Button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* seventh section */}
      <div className="h-[50vh] lg:h-[85vh] relative">
        <video
          src="assets/ready_to_transform_low.mp4"
          autoPlay
          muted
          loop
          controlsList="nodownload"
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
