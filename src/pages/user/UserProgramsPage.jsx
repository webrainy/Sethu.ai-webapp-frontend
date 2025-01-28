import React, { useRef } from "react";
import UserNavbar from "../../components/navbars/UserNavbar";
import DownArrowSvg from "../../assets/down_arrow.svg";
import Footer from "../../components/common/Footer";
import HolisticEducationSvg from "../../assets/holistic_education.svg";
import PersonalGrowthSvg from "../../assets/personal_growth.svg";
import IndustryRelevantSvg from "../../assets/industry_relevant_training.svg";
import PlacementAssistanceSvg from "../../assets/placement_assistance.svg";
import CommunityOfServiceSvg from "../../assets/community_of_service.svg";
import LeadershipDevelopSvg from "../../assets/leadership_development.svg";
import EffectiveCommunicationSvg from "../../assets/effective_communication.svg";
import TeamworkCollaborationSvg from "../../assets/teamwork_collaboration.svg";
import StructuredForSuccessSvg from "../../assets/structured_for_success.svg";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

const data = [
  {
    label: "HTML",
    value: "html",
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people 
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: "React",
    value: "react",
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Vue",
    value: "vue",
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
];

function UserProgramsPage() {
  const ref = useRef(null);

  const ScrollToNextSection = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <UserNavbar />

      <div className="flex flex-col justify-center items-center px-2 lg:px-0 our-programs-hero-section">
        <div className="max-w-[1180px] w-full h-[60vh] sm:h-screen flex justify-end items-center flex-col text-white gap-1 relative">
          <p className="text-4xl sm:text-7xl font-ddin text-center">
            Unlocking Potential,
          </p>
          <p className="text-4xl sm:text-7xl font-semibold font-ddin text-yellow-400 text-center">
            Building Futures
          </p>
          <p className="text-[13px] sm:text-[19px] font-myriad font-light text-center pb-10">
            Transform your life with skills, values, and leadership.
            <br /> Empower yourself to make a meaningful impact on the world.
          </p>
          <div className="absolute -right-1 sm:right-0 bottom-1 sm:bottom-10">
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
      <div className="px-5 lg:px-0 flex justify-center" ref={ref}>
        <div className="max-w-[1180px] w-full h-full pt-10 md:pt-16">
          <p className="text-[#E68242] font-ddin text-[34px]/[32px] sm:text-5xl md:text-[65px]/[65px] font-light">
            Building Skills.
            <br />
            Shaping Character.
            <br />
            <span className="font-semibold">Creating Leaders.</span>
          </p>
          <p className="mt-3 md:mt-5 text-[19px]/[22px] font-myriad font-light">
            We offer a range of programs designed to equip you with both{" "}
            <br className="hidden md:block" />
            professional expertise and personal development, blending technical{" "}
            <br className="hidden md:block" />
            skills, moral values, and soft skills to create well-rounded,{" "}
            <br className="hidden md:block" />
            capable individuals.
          </p>
        </div>
      </div>

      {/* third section */}
      <div className="px-5 lg:px-0 flex justify-center py-12">
        <div className="max-w-[1180px] w-full h-full">
          <Tabs value="html">
            <TabsHeader
              className="bg-transparent text-white"
              indicatorProps={{
                className: "bg-[#DD4633] rounded-none shadow-none !text-white",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-[#DD4633]">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>

          <Tabs value="html">
            <TabsHeader
              className="bg-transparent text-white"
              indicatorProps={{
                className: "bg-[#DD4633] rounded-none shadow-none !text-white",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-[color]">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>

      {/* fourth section */}
      <div className="px-5 lg:px-0 flex justify-center">
        <div className="max-w-[1180px] w-full h-full pb-10 md:pb-6">
          <div className="grid md:grid-cols-3 gap-6 md:gap-4">
            {/* card 1 */}
            <div className="flex flex-col gap-1 md:gap-2">
              <img
                src={LeadershipDevelopSvg}
                alt="sethu.ai"
                className="w-[75px] md:w-[85px]"
              />
              <p className="text-[#E68242] font-semibold font-myriad text-xl md:text-2xl/[25px]">
                Leadership Development
              </p>
              <p className="text-[#2C2C2C] font-light font-myriad text-[17px]/[20px] md:text-[19px]/[22px]">
                Cultivating the ability to lead with
                <br className="hidden md:block" /> empathy and vision.
              </p>
            </div>

            {/* card 2 */}
            <div className="flex flex-col gap-1 md:gap-2">
              <img
                src={EffectiveCommunicationSvg}
                alt="sethu.ai"
                className="w-[62px] md:w-[72px]"
              />
              <p className="text-[#E68242] font-semibold font-myriad text-xl md:text-2xl/[25px]">
                Effective Communication
              </p>
              <p className="text-[#2C2C2C] font-light font-myriad text-[17px]/[20px] md:text-[19px]/[22px]">
                Developing clear and impactful communication skills, crucial for
                any career path.
              </p>
            </div>

            {/* card 3 */}
            <div className="flex flex-col gap-1 md:gap-2">
              <img
                src={TeamworkCollaborationSvg}
                alt="sethu.ai"
                className="w-[82px] md:w-[92px]"
              />
              <p className="text-[#E68242] font-semibold font-myriad text-xl md:text-2xl/[25px]">
                Teamwork and Collaboration
              </p>
              <p className="text-[#2C2C2C] font-light font-myriad text-[17px]/[20px] md:text-[19px]/[22px]">
                Learning how to work efficiently in a team environment,
                fostering cooperation and mutual respect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* fifth section */}
      <div className="px-5 lg:px-0 flex justify-center">
        <div className="max-w-[780px] w-full h-full pt-10 md:pt-16 pb-16 md:pb-24">
          <p className="text-[#E68242] font-ddin text-[34px]/[32px] sm:text-5xl md:text-[65px]/[70px] font-light relative text-center">
            Structured for Success,
            <br />
            <span className="font-semibold flex gap-4 items-end justify-center">
              Designed for Growth
              <img
                src={StructuredForSuccessSvg}
                alt="sethu.ai"
                className="w-[35px] sm:w-[55px] md:w-[75px]"
              />
            </span>
          </p>
          <p className="text-center mt-4">
            Our programs follow a unique blend of classroom learning and
            hands-on
            <br className="hidden sm:block" /> practice, ensuring that every
            participant gains both theoretical knowledge
            <br className="hidden sm:block" /> and practical experience. Here's
            how it works:
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-2 mt-8 max-w-[540px] w-full">
              <div className="py-8 px-2 text-center flex flex-col gap-3">
                <p className="text-[25px]/[25px] font-semibold font-myriad text-[#DD4633]">
                  Duration
                </p>
                <p className="text-lg font-myriad font-light text-[#2C2C2C]">
                  Each program runs for 3 months.
                </p>
              </div>
              <div className="py-8 px-2 text-center flex flex-col gap-3 bg-[#EBEBEB]">
                <p className="text-[25px]/[25px] font-semibold font-myriad text-[#DD4633]">
                  Batch Size
                </p>
                <p className="text-lg font-myriad font-light text-[#2C2C2C]">
                  Small batches of 20 students to ensure individual attention
                  and mentorship.
                </p>
              </div>
              <div className="py-8 px-2 text-center flex flex-col gap-3 bg-[#EBEBEB]">
                <p className="text-[25px]/[25px] font-semibold font-myriad text-[#DD4633]">
                  Daily Schedule
                </p>
                <p className="text-lg font-myriad font-light text-[#2C2C2C]">
                  2 hours of focused classroom sessions, followed by 4 hours of
                  hands-on, real-world practice.
                </p>
              </div>
              <div className="py-8 px-2 text-center flex flex-col gap-3">
                <p className="text-[25px]/[25px] font-semibold font-myriad text-[#DD4633]">
                  Instructors
                </p>
                <p className="text-lg font-myriad font-light text-[#2C2C2C]">
                  Industry experts and passionate Sai volunteers who bring both
                  expertise and heart into the learning experience.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-[19px]/[22px] text-center font-myriad font-light">
            This dynamic approach allows students to fully absorb the skills,
            values,
            <br className="hidden sm:block" /> and soft skills needed to
            succeed.
          </p>
        </div>
      </div>

      {/* sixth section */}
      <div className="px-5 lg:px-0 flex justify-center join-a-movement-section">
        <div className="max-w-[1180px] w-full h-full py-12 sm:py-24">
          <p className="text-center text-white font-ddin text-[26px]/[32px] sm:text-5xl md:text-[62px]/[62px] font-light">
            Join a Movement That Changes <br />
            <span className="font-semibold">Lives—Including Yours</span>
          </p>
          <p className="text-center text-[16px]/[20px] sm:text-[19px]/[22px] mt-5 font-myriad font-light text-white">
            By joining our program, you're not just learning skills; you're
            becoming part of a larger
            <br className="hidden md:block" /> mission to empower and uplift.
            Here's why you should be a part of
            <br className="hidden md:block" /> this transformative journey
          </p>
          <div className="flex flex-col md:flex-row justify-center flex-wrap gap-6 my-8">
            <div
              className="md:w-[31%] bg-white py-5 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={HolisticEducationSvg}
                alt="sethu.ai"
                className="w-[65px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Holistic Education
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Gain technical skills, value-based education, and soft skills in
                one comprehensive program.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={PersonalGrowthSvg}
                alt="sethu.ai"
                className="w-[65px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Personal Growth
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Learn how to lead with compassion, communicate with clarity, and
                serve with purpose.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={IndustryRelevantSvg}
                alt="sethu.ai"
                className="w-[85px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Industry-Relevant Training
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Get equipped with the tools and skills that are in demand in
                today's job market.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={PlacementAssistanceSvg}
                alt="sethu.ai"
                className="w-[85px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Placement Assistance
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                We don't just train you; we help you find opportunities to apply
                your skills in real-world settings.
              </p>
            </div>
            <div
              className="md:w-[31%] bg-white py-4 px-3 flex flex-col items-center justify-start gap-3"
              style={{ boxShadow: "0px 3px 6px #00000029" }}
            >
              <img
                src={CommunityOfServiceSvg}
                alt="sethu.ai"
                className="w-[73px]"
              />
              <p className="text-[25px] font-myriad font-semibold text-[#DD4633] text-center">
                Community of Service
              </p>
              <p className="text-center text-lg/[22px] text-[#2C2C2C] font-myriad font-light">
                Be part of a network that believes in giving back to society and
                making a difference in the world.
              </p>
            </div>
          </div>
          <p className="text-center text-[19px]/[22px] mt-5 font-myriad font-light text-white">
            When you join our program, you're not just preparing for a
            job—you're preparing
            <br className="hidden md:block" /> for a meaningful, impactful life.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserProgramsPage;
