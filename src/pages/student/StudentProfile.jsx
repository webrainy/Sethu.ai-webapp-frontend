import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Input,
  Option,
  Radio,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { base_url, EXPERTISE_LEVELS } from "../../utils/constants";
import { fetchStudentProfile } from "../../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";

function StudentProfile() {
  const location = useLocation();
  const user = location.state?.user;
  const { profile_data } = useSelector((state) => state.student);
  const studentProfile = profile_data?.studentData?.[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    cgpa: "",
    year_passed: "",
    gmat: "",
    course_prep: "",
    curnt_work: "",
    commit_ft: "",
    hobbies: "",
    linkedin_url: "",
    github_url: "",
    resume: "",
    coverletter: "",
    skill: "",
    father_occ: "",
    mother_occ: "",
    income: "",
    review_status: "",
    select_batch: "",
    final_comments: "",
    python: "",
    sql: "",
    java: "",
    analytical_skills: "",
    english_proficiency: "",
    problem_Solving: "",
    hckr_rnk: "",
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

  console.log(profile_data);

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
        resume: studentProfile.resume || "",
        coverletter: studentProfile.coverletter || "",
        skill: studentProfile.skill || "",
        father_occ: studentProfile.father_occ || "",
        mother_occ: studentProfile.mother_occ || "",
        income: studentProfile.income || "",
        review_status: studentProfile.review_status || "",
        select_batch: studentProfile.select_batch || "",
        final_comments: studentProfile.final_comments || "",
        sk_python: studentProfile.sk_python || "",
        sk_sql: studentProfile.sk_sql || "",
        sk_java: studentProfile.sk_java || "",
        sk_analyticalskill: studentProfile.sk_analyticalskill || "",
        sk_prblmsolving: studentProfile.sk_prblmsolving || "",
        sk_engprof: studentProfile.sk_engprof || "",
        hckr_rnk: studentProfile.hckr_rnk || "",
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
    console.log("data", formData);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">
          All About <span className="text-[#FF9D23]">{formData.name}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {profile_data && profile_data?.studentData?.length > 0 ? (
          <>
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
                  // defaultValue={profile_data[0].name}
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
                  onChange={(e) => handleInputChange(e.target.value, "email")}
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
                  onChange={(e) => handleInputChange(e.target.value, "phone")}
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
                  onChange={(e) =>
                    handleInputChange(e.target.value, "location")
                  }
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
                  onChange={(e) => handleInputChange(e.target.value, "cgpa")}
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
                  onChange={(e) =>
                    handleInputChange(e.target.value, "year_passed")
                  }
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
                  onChange={(e) => handleInputChange(e.target.value, "gmat")}
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
                    onChange={(e) =>
                      handleInputChange(e.target.value, "course_prep")
                    }
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
                    onChange={(e) =>
                      handleInputChange(e.target.value, "curnt_work")
                    }
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
                      onChange={(e) =>
                        handleInputChange(e.target.value, "commit_ft")
                      }
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
                    onChange={(e) =>
                      handleInputChange(e.target.value, "hobbies")
                    }
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
                    value={formData.linkedin_url || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "linkedin_url")
                    }
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
                    onChange={(e) =>
                      handleInputChange(e.target.value, "github_url")
                    }
                    required
                  />

                  <div className="flex justify-between items-center">
                    {" "}
                    <p className="text-center font-ddin font-semibold">
                      Resume
                    </p>
                    <Typography
                      value={formData.resume}
                      className="capitalize font-ddin font-normal text-base text-[#DD4633]"
                      onClick={() => {
                        if (formData.resume) {
                          window.open(base_url + formData.resume, "_blank");
                        } else {
                          alert("No resume available");
                        }
                      }}
                    >
                      View
                    </Typography>
                  </div>
                  <div className="text-left">
                    <Input
                      type="file"
                      label="Upload your resume"
                      name="resume"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type !== "application/pdf") {
                          alert("Only PDF files are allowed.");
                          e.target.value = "";
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            resume: file,
                          }));
                        }
                      }}
                      accept=".pdf"
                      style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                      containerProps={{
                        className: "font-ddin",
                      }}
                    />
                    <span className="font-ddin text-xs text-red-500">
                      Only PDF files are allowed.
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    {" "}
                    <p className="text-center font-ddin font-semibold">
                      Cover Letter
                    </p>
                    <Typography
                      value={formData.coverletter}
                      className="capitalize font-ddin font-normal text-base text-[#DD4633]"
                      onClick={() => {
                        if (formData.coverletter) {
                          window.open(
                            base_url + formData.coverletter,
                            "_blank"
                          );
                        } else {
                          alert("No cover letter available");
                        }
                      }}
                    >
                      View
                    </Typography>
                  </div>
                  <div className="text-left">
                    <Input
                      type="file"
                      label="Upload your cover letter"
                      name="coverletter"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type !== "application/pdf") {
                          alert("Only PDF files are allowed.");
                          e.target.value = "";
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            coverletter: file,
                          }));
                        }
                      }}
                      accept=".pdf"
                      style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                      containerProps={{
                        className: "font-ddin",
                      }}
                    />
                    <span className="font-ddin text-xs text-red-500">
                      Only PDF files are allowed.
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills and Expertise */}
              <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
                <p className="font-ddin font-semibold text-lg">
                  Skills and Expertise
                </p>
                {[
                  { name: "sk_python", label: "Python" },
                  { name: "sk_sql", label: "Sql" },
                  { name: "sk_java", label: "Java" },
                  { name: "sk_analyticalskill", label: "Analytical Skills" },
                  { name: "sk_engprof", label: "English Proficiency" },
                  { name: "sk_prblmsolving", label: "Problem solving" },
                ].map((skill) => (
                  <div key={skill.name} className="text-left">
                    <label className="block text-gray-700 mt-2 mb-[5px] font-ddin capitalize">
                      {skill.label}
                      <span className="text-red-600">*</span>
                    </label>
                    <Select
                      name={skill.name}
                      className="mb-2 font-ddin"
                      label={`Select Expertise for ${skill.label.replace(
                        "sk_",
                        ""
                      )}`}
                      value={
                        formData[skill.name] !== undefined
                          ? String(formData[skill.name])
                          : ""
                      }
                      onChange={(value) => handleInputChange(value, skill.name)}
                      required
                    >
                      {EXPERTISE_LEVELS.map((level) => (
                        <Option
                          key={level.value}
                          value={String(level.value)}
                          style={{ fontFamily: "D-DIN" }}
                        >
                          {level.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ))}
                <div className="text-left mt-3 mb-3">
                  <label className="block text-gray-700 font-ddin mb-1">
                    Hacker Rank Score
                  </label>
                  <Input
                    type="number"
                    label="Hacker Rank Score"
                    name="hckr_rnk"
                    value={formData.hckr_rnk}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "hckr_rnk")
                    }
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    required
                  />
                </div>
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
                  onChange={(e) =>
                    handleInputChange(e.target.value, "father_occ")
                  }
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
                  onChange={(e) =>
                    handleInputChange(e.target.value, "mother_occ")
                  }
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
                  onChange={(e) => handleInputChange(e.target.value, "incomev")}
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
                    >
                      {income}
                    </Option>
                  ))}
                </Select>
              </div>
              {/* </div> */}
              {/* ))} */}
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
          </>
        ) : (
          <div className="h-[50vh] flex justify-center items-center flex-col">
            <p className="text-3xl font-ddin font-semibold text-center">
              No result found
            </p>
          </div>
        )}{" "}
      </form>
    </div>
  );
}

export default StudentProfile;
