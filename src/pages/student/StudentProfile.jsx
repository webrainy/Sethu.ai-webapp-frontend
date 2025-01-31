import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Input,
  Option,
  Radio,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { EXPERTISE_LEVELS } from "../../utils/constants";
import { fetchStudentProfile } from "../../redux/studentSlice";
import { useDispatch } from "react-redux";

function StudentProfile() {
  const location = useLocation();
  const user = location.state?.user;

  const dispatch = useDispatch();

  const access_token = localStorage.getItem("sethu_student_access_token")

  useEffect(() => {
      dispatch(
        fetchStudentProfile({
          end_point: "/api/student/list",
          access_token: access_token,
        })
      ).unwrap();
    }, [dispatch]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    education: user?.education || "",
    cgpa: user?.cgpa || "",
    yearPassed: user?.yearPassed || "",
    gmatScore: user?.gmatScore || "",
    preparingCourse: user?.preparingCourse || "",
    currentWork: user?.currentWork || "",
    commitment: user?.commitment || "",
    hobbies: user?.hobbies || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    skill: user?.skill || "",
    fatherOccupation: user?.fatherOccupation || "",
    motherOccupation: user?.motherOccupation || "",
    householdIncome: user?.householdIncome || "",
    review_status: user?.review_status || "",
    select_batch: user?.select_batch || "",
    final_comments: user?.final_comments || "",
  });

  const handleInputChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">
          All About <span className="text-[#FF9D23]">Student Name</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5 grid lg:grid-cols-2 gap-4">
          {/* personal information */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg mb-1">
              Personal Information
            </p>
            <Input
              label="Name"
              type="text"
              name="name"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              // value={formData.name}
              onChange={handleInputChange}
              defaultValue={"qwerty"}
              containerProps={{
                className: "font-ddin",
              }}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              // value={formData.email}
              onChange={handleInputChange}
              containerProps={{
                className: "font-ddin",
              }}
              defaultValue={"qwerty@test.in"}
              required
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              // value={formData.phone}
              onChange={handleInputChange}
              maxLength={10}
              containerProps={{
                className: "font-ddin",
              }}
              defaultValue={"1234567890"}
              required
            />
            <Textarea
              label="Location"
              name="location"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              // value={formData.location}
              onChange={handleInputChange}
              containerProps={{
                className: "font-ddin",
              }}
              defaultValue={"Classes near Khairtabad Metro Station, Hyderbad."}
              required
            />
          </div>

          {/* Education Details */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg mb-1">
              Education Details
            </p>
            <div className="font-ddin">
              <p>Highest Education Completed</p>
              <div className="flex flex-row gap-3">
                <Radio name="education" label="Bachelors" value={"Bachelors"} />
                <Radio
                  name="education"
                  label="Masters"
                  value={"Masters"}
                  defaultChecked
                />
                <Radio name="education" label="Others" value={"Others"} />
              </div>
            </div>
            <Input
              label="CGPA"
              type="number"
              name="cgpa"
              // value={formData.cgpa}
              onChange={handleInputChange}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              className="appearance-none outline-none"
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "-" ||
                  e.key === "+"
                ) {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => e.target.blur()}
              defaultValue={"50"}
              required
            />
            <Input
              label="Year Passed"
              type="number"
              name="yearPassed"
              // value={formData.yearPassed}
              onChange={handleInputChange}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "-" ||
                  e.key === "+"
                ) {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => e.target.blur()}
              defaultValue={"2023"}
              required
            />
            <Input
              label="GMAT Score"
              type="number"
              name="gmatScore"
              // value={formData.gmatScore}
              onChange={handleInputChange}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "-" ||
                  e.key === "+"
                ) {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => e.target.blur()}
              defaultValue={"2567"}
              required
            />
          </div>

          <div>
            {/* Preferences */}
            <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
              <p className="font-ddin font-semibold text-lg">Preferences</p>
              <Input
                label="Are you preparing for any course?"
                name="preparingCourse"
                // value={formData.preparingCourse}
                onChange={handleInputChange}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                defaultValue={"Yes"}
                required
              />
              <Input
                label="What are you currently working on?"
                name="currentWork"
                // value={formData.currentWork}
                onChange={handleInputChange}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                defaultValue={"Developer"}
                required
              />
              <div className="text-left">
                <label className="block mb-1 font-ddin">
                  Can you commit 3 months full-time (8 hours/day) in Hyderabad?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <Select
                  name="commitment"
                  label="Commitment"
                  // value={formData.commitment}
                  onChange={handleInputChange}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  defaultValue={"Yes"}
                >
                  <Option value="Yes" style={{ fontFamily: "D-DIN" }}>
                    Yes
                  </Option>
                  <Option value="No" style={{ fontFamily: "D-DIN" }}>
                    No
                  </Option>
                </Select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit mt-4">
              <p className="font-ddin font-semibold text-lg">
                Additional Information
              </p>
              <Textarea
                type="text"
                label="Hobbies"
                name="hobbies"
                //   value={formData.hobbies}
                onChange={handleInputChange}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                defaultValue={"Drawing"}
                required
              />
              <Input
                type="url"
                label="LinkedIn profile URL"
                name="linkedin"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                //   value={formData.linkedin}
                onChange={handleInputChange}
                defaultValue={"https://sethu.ai/"}
                required
              />
              <Input
                type="url"
                label="Enter your GitHub or other source code URL"
                name="github"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                //   value={formData.github}
                onChange={handleInputChange}
                defaultValue={"https://sethu.ai/"}
                required
              />

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-center font-ddin">Resume</p>
                  <Button className="shadow-none py-2 hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]">
                    Download
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-center font-ddin">Cover letter</p>
                  <Button className="shadow-none py-2 hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Skills and Expertise */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">
              Skills and Expertise
            </p>
            {[
              "Python",
              "Sql",
              "Java",
              "AnalyticalSkills",
              "EnglishProficiency",
              "ProblemSolving",
            ].map((skill) => (
              <div key={skill} className="text-left">
                <label className="block text-gray-700 mt-2 mb-[5px] font-ddin">
                  {skill.replace(/([A-Z])/g, " $1")}
                  <span className="text-red-600">*</span>
                </label>
                <Select
                  name={skill}
                  className="mb-2 font-ddin"
                  label={`Select Expertise for ${skill}`}
                  // value={formData[skill]}
                  onChange={handleInputChange}
                  defaultValue={"Beginner"}
                  required
                >
                  {EXPERTISE_LEVELS.map((level) => (
                    <Option
                      key={level}
                      value={level}
                      style={{ fontFamily: "D-DIN" }}
                      defaultValue={"Beginner"}
                    >
                      {level}
                    </Option>
                  ))}
                </Select>
              </div>
            ))}
          </div>

          {/* Other Information */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Other Information</p>
            <Input
              type="text"
              name="fatherOccupation"
              label="Father's Occupation"
              // value={formData.fatherOccupation}
              onChange={handleInputChange}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              defaultValue={"Farmer"}
              required
            />
            <Input
              type="text"
              name="motherOccupation"
              label="Mother's Occupation"
              // value={formData.motherOccupation}
              onChange={handleInputChange}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              defaultValue={"Farmer"}
              required
            />
            <Select
              name="householdIncome"
              label="Select Household Income"
              // value={formData.householdIncome}
              onChange={handleInputChange}
            >
              {[
                "Less than 5 Lakhs",
                "5-10 Lakhs",
                "10-15 Lakhs",
                "15+ Lakhs",
              ].map((income) => (
                <Option
                  key={income}
                  //value={income}
                  style={{ fontFamily: "D-DIN" }}
                  defaultValue={"5-10 Lakhs"}
                >
                  {income}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-4 mb-10 gap-4">
          <Button
            type="button"
            className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-[#494848] rounded-[10px] px-12 outline-none shadow-none hover:shadow-none border border-[#9e9b9a] hover:border-[#9e9b9a] hover:bg-[#9e9b9a] hover:text-white bg-transparent text-[#9e9b9a]"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfile;
