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
import { useDispatch, useSelector } from "react-redux";

function StudentProfile() {
  const location = useLocation();
  const user = location.state?.user;
  const { profile_data } = useSelector((state) => state.student);
  const studentProfile = profile_data?.[0];

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    education: user?.education || "",
    cgpa: user?.cgpa || "",
    year_passed: user?.year_passed || "",
    gmat: user?.gmat || "",
    course_prep: user?.course_prep || "",
    curnt_work: user?.curnt_work || "",
    commit_ft: user?.commit_ft || "",
    hobbies: user?.hobbies || "",
    linkedin_url: user?.linkedin_url || "",
    github_url: user?.github_url || "",
    skill: user?.skill || "",
    father_occ: user?.father_occ || "",
    mother_occ: user?.mother_occ || "",
    income: user?.income || "",
    review_status: user?.review_status || "",
    select_batch: user?.select_batch || "",
    final_comments: user?.final_comments || "",
    python:user?.python||"",
    sql:user?.sql||"",
    java:user?.java||"",
    analytical_skills:user?.analytical_skills||"",
    english_proficiency:user?.english_proficiency||"",
    problem_Solving:user?.problem_Solving||""
  });

  const dispatch = useDispatch();

  const access_token = localStorage.getItem("sethu_student_access_token");

  useEffect(() => {
    dispatch(
      fetchStudentProfile({
        end_point: "/api/student/list",
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (studentProfile) {
      setFormData({
        name: studentProfile.name || "",
        email: studentProfile.email || "",
        phone: studentProfile.phone || "",
        location: studentProfile.location || "",
        education: studentProfile.education || "",
        cgpa: studentProfile.cgpa || "",
        year_passed: studentProfile.year_passed || "",
        gmat: studentProfile.gmat || "",
        course_prep: studentProfile.course_prep || "",
        curnt_work: studentProfile.curnt_work || "",
        commit_ft: studentProfile.commit_ft || "",
        hobbies: studentProfile.hobbies || "",
        linkedin_url: studentProfile.linkedin_url || "",
        github_url: studentProfile.github_url || "",
        skill: studentProfile.skill || "",
        father_occ: studentProfile.father_occ || "",
        mother_occ: studentProfile.mother_occ || "",
        income: studentProfile.income || "",
        review_status: studentProfile.review_status || "",
        select_batch: studentProfile.select_batch || "",
        final_comments: studentProfile.final_comments || "",
        sk_python:studentProfile.sk_python||"",
        sk_sql:studentProfile.sk_sql||"",
        sk_java:studentProfile.sk_java||"",
        sk_analyticalskill:studentProfile.sk_analyticalskill||"",
        sk_prblmsolving:studentProfile.sk_prblmsolving||"",
        sk_engprof:studentProfile.sk_engprof||""
      });
    }
  }, [studentProfile, user]);

  const handleInputChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  console.log(profile_data);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">
          All About <span className="text-[#FF9D23]">Student Name</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {profile_data && profile_data.length > 0 ? (
          <div className="mt-5 grid lg:grid-cols-2 gap-4">
            {/* {profile_data.map((item, i) => ( */}
            {/* <div> */}
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
                value={formData.name || ""}
                onChange={(e) => handleInputChange(e.target.value, "name")}
                defaultValue={profile_data[0].name}
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
                value={formData.email}
                onChange={handleInputChange}
                containerProps={{
                  className: "font-ddin",
                }}
                // defaultValue={"qwerty@test.in"}
                required
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                value={formData.phone}
                onChange={handleInputChange}
                maxLength={10}
                containerProps={{
                  className: "font-ddin",
                }}
                //defaultValue={"1234567890"}
                required
              />
              <Textarea
                label="Location"
                name="location"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                value={formData.location}
                onChange={handleInputChange}
                containerProps={{
                  className: "font-ddin",
                }}
                //defaultValue={"Classes near Khairtabad Metro Station, Hyderbad."}
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
                  <Radio
                    name="education"
                    label="Bachelors"
                    value="Bachelors"
                    checked={formData.education === "Bachelors"}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "education")
                    }
                  />
                  <Radio
                    name="education"
                    label="Masters"
                    value="Masters"
                    checked={formData.education === "Masters"}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "education")
                    }
                  />
                  <Radio
                    name="education"
                    label="Others"
                    value="Others"
                    checked={formData.education === "Others"}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "education")
                    }
                  />
                </div>
              </div>
              <Input
                label="CGPA"
                type="number"
                name="cgpa"
                value={formData.cgpa}
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
                required
              />
              <Input
                label="Year Passed"
                type="number"
                name="year_passed"
                value={formData.year_passed}
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
                required
              />
              <Input
                label="GMAT Score"
                type="number"
                name="gmat"
                value={formData.gmat}
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
                required
              />
            </div>

            <div>
              {/* Preferences */}
              <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
                <p className="font-ddin font-semibold text-lg">Preferences</p>
                <Input
                  label="Are you preparing for any course?"
                  name="course_prep"
                  value={formData.course_prep}
                  onChange={handleInputChange}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <Input
                  label="What are you currently working on?"
                  name="curnt_work"
                  value={formData.curnt_work}
                  onChange={handleInputChange}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <div className="text-left">
                  <label className="block mb-1 font-ddin">
                    Can you commit 3 months full-time (8 hours/day) in
                    Hyderabad? <span className="text-red-600">*</span>
                  </label>
                  <Select
                    name="commit_ft"
                    label="Commitment"
                    value={formData.commit_ft}
                    onChange={handleInputChange}
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
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
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <Input
                  type="url"
                  label="Linkdin profile URL"
                  name="linkedin_url"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="url"
                  label="Enter your GitHub or other source code URL"
                  name="github_url"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  value={formData.github_url}
                  onChange={handleInputChange}
                  required
                />

                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <p className="text-center font-ddin">Resume</p>
                    <Button
                      value={formData.resume}
                      className="shadow-none py-2 hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
                    >
                      Download
                    </Button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-center font-ddin">Cover letter</p>
                    <Button
                      value={formData.coverletter}
                      className="shadow-none py-2 hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
                    >
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
                "python",
                "sql",
                "java",
                "analytical_skills",
                "english_proficiency",
                "problem_Solving",
              ].map((skill) => (
                <div key={skill} className="text-left">
                  <label className="block text-gray-700 mt-2 mb-[5px] font-ddin capitalize">
                    {skill.replace(/([A-Z])/g, " $1")}
                    <span className="text-red-600">*</span>
                  </label>
                  <Select
                    name={skill}
                    className="mb-2 font-ddin"
                    label={`Select Expertise for ${skill}`}
                    value={
                      formData[skill] !== undefined
                        ? String(formData[skill])
                        : "0"
                    }
                    onChange={(e) => handleInputChange(e.target.value, skill)}
                    required
                  >
                    {EXPERTISE_LEVELS.map((level) => (
                      <Option
                        key={level.value}
                        value={String(level.value)}
                        style={{ fontFamily: "D-DIN" }}
                      >
                        {String(level)}
                      </Option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>

            {/* Other Information */}
            <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
              <p className="font-ddin font-semibold text-lg">
                Other Information
              </p>
              <Input
                type="text"
                name="father_occ"
                label="Father's Occupation"
                value={formData.father_occ}
                onChange={handleInputChange}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                required
              />
              <Input
                type="text"
                name="mother_occ"
                label="Mother's Occupation"
                value={formData.mother_occ}
                onChange={handleInputChange}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                required
              />
              <Select
                name="income"
                label="Select Household Income"
                value={formData.income}
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
                    value={income}
                    style={{ fontFamily: "D-DIN" }}
                    defaultValue={"5-10 Lakhs"}
                  >
                    {income}
                  </Option>
                ))}
              </Select>
            </div>
            {/* </div> */}
            {/* ))} */}
          </div>
        ) : (
          <div className="h-[50vh] flex justify-center items-center flex-col">
            <p className="text-3xl font-ddin font-semibold text-center">
              No result found
            </p>
          </div>
        )}{" "}
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
