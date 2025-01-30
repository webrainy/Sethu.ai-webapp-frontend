import React, { useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { mailPattern, phoneNumber, strongPwd } from "../../utils/constants";
import toast from "react-hot-toast";
import RegisterImg from "../../assets/register_img.png";
import { useNavigate } from "react-router-dom";
import { TbEye, TbEyeOff } from "react-icons/tb";

function CourseRegister() {
  const [visibility, setVisibility] = useState({
    personalInfo: true,
    educationDetails: false,
    preferences: false,
    skills_and_expertise: false,
    additional_information: false,
    family_details: false,
  });
  const [passVisible, setPassVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    education: "",
    cgpa: "",
    yearPassed: "",
    gmatScore: "",
    preparingCourse: "",
    currentWork: "",
    commitment: "",
    Python: "",
    Sql: "",
    Java: "",
    AnalyticalSkills: "",
    ProblemSolving: "",
    EnglishProficiency: "",
    HackerRankScore: "",
    hobbies: "",
    linkedin: "",
    github: "",
    resume: "",
    coverLetter: "",
    fatherOccupation: "",
    motherOccupation: "",
    householdIncome: "",
  });

  const navigate = useNavigate();

  const expertiseLevels = [
    "Beginner",
    "Intermediate",
    "Proficient",
    "Advanced",
    "Expert",
  ];

  // const handlePasswordChange = (e) => {
  //   const value = e.target.value;

  //   if (strongPwd.test(value)) {
  //     setLoginValid({ ...loginValid, password: true });
  //   } else {
  //     setLoginValid({ ...loginValid, password: false });
  //   }
  //   setLoginData({ ...loginData, password: value });
  // };

  const handlePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { hobbies, linkedin, github, coverLetter, resume } = formData;
    if (!hobbies || !linkedin || !github || !coverLetter || !resume) {
      toast.error(
        "Please fill all fields in the  Additional Information section."
      );
    }
  };

  const handlePersonalInformationButton = () => {
    const { name, email, password, phone, location } = formData;
    const mailRegex = new RegExp(mailPattern);
    const phoneRegex = new RegExp(phoneNumber);
    const passwordRegex = new RegExp(strongPwd);

    if (!name || !email || !password || !phone || !location) {
      toast.error(
        "Please fill all fields in the Personal Information section."
      );
      return;
    }

    if (!mailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must have atleast 1 lowercase, number, special characters and minimum 8 characters."
      );
      return;
    }

    setVisibility((prev) => ({
      ...prev,
      personalInfo: false,
      educationDetails: true,
      preferences: false,
      skills_and_expertise: false,
      additional_information: false,
      family_details: false,
    }));
  };

  const handleEducationDetailButton = () => {
    const { education, cgpa, yearPassed, gmatScore } = formData;
    if (!education || !cgpa || !yearPassed || !gmatScore) {
      toast.error("Please fill all fields in the Educational Details section.");
      return;
    }
    setVisibility({
      ...visibility,
      personalInfo: false,
      educationDetails: false,
      preferences: true,
      skills_and_expertise: false,
      additional_information: false,
      family_details: false,
    });
  };

  const handlePreferenceButton = () => {
    const { preparingCourse, currentWork, commitment } = formData;
    if (!preparingCourse || !currentWork || !commitment) {
      toast.error("Please fill all fields in the  Preferences section.");
      return;
    }
    setVisibility({
      ...visibility,
      personalInfo: false,
      educationDetails: false,
      preferences: false,
      skills_and_expertise: true,
      additional_information: false,
      family_details: false,
    });
  };

  const handleSkillsandExpertiseButton = () => {
    const {
      Python,
      Java,
      Sql,
      AnalyticalSkills,
      ProblemSolving,
      EnglishProficiency,
      HackerRankScore,
    } = formData;
    if (
      !Python ||
      !Java ||
      !Sql ||
      !AnalyticalSkills ||
      !ProblemSolving ||
      !EnglishProficiency ||
      !HackerRankScore
    ) {
      toast.error(
        "Please fill all fields in the  Skills and Expertise section."
      );
      return;
    }
    setVisibility({
      ...visibility,
      personalInfo: false,
      educationDetails: false,
      preferences: false,
      skills_and_expertise: false,
      additional_information: true,
      family_details: false,
    });
  };

  const handleAdditionalInformation = () => {
    const { hobbies, linkedin, github, coverLetter, resume } = formData;
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/[\w\d-_.?=]*)*$/;

    if (!hobbies || !linkedin || !github || !coverLetter || !resume) {
      toast.error(
        "Please fill all fields in the Additional Information section."
      );
      return;
    }

    if (!urlRegex.test(linkedin)) {
      toast.error("Please enter a valid LinkedIn profile URL.");
      return;
    }

    if (!urlRegex.test(github)) {
      toast.error("Please enter a valid GitHub profile URL.");
      return;
    }

    setVisibility({
      ...visibility,
      personalInfo: false,
      educationDetails: false,
      preferences: false,
      skills_and_expertise: false,
      additional_information: false,
      family_details: true,
    });
  };

  const handleButtonNavigate = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="bg-gradient-to-b from-[#de4a34] to-[#e57f41] flex justify-center items-center h-screen text-[#333]">
      <div
        className="flex bg-white rounded-[20px] overflow-hidden max-w-[900px] w-full mx-3 md:mx-0"
        style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="p-5 sm:p-10 flex-[1] flex flex-col justify-center">
          <div className="mb-5 text-center">
            <p className="font-light text-xl sm:text-3xl text-[#E68242] uppercase font-ddin">
              Python Data Engineer{" "}
              <span className="font-semibold text-xl sm:text-3xl uppercase">
                Training
              </span>
            </p>

            <p className="tracking-[3px] text-gray-500 text-base sm:text-lg font-ddin">
              Registration Form
            </p>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Personal Info */}
            {visibility.personalInfo && (
              <div className="space-y-3">
                <h3 className="font-bold font-ddin">Personal Information</h3>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  value={formData.name}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setFormData({ ...formData, phone: value });
                    }
                  }}
                  maxLength={10}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <Input
                  label="Password"
                  name="password"
                  type={!passVisible ? "password" : "text"}
                  size="lg"
                  placeholder="********"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  icon={
                    !passVisible ? (
                      <TbEyeOff
                        onClick={handlePasswordVisibility}
                        className="cursor-pointer"
                      />
                    ) : (
                      <TbEye
                        onClick={handlePasswordVisibility}
                        className="cursor-pointer"
                      />
                    )
                  }
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                <Textarea
                  label="Location"
                  name="location"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  value={formData.location}
                  onChange={handleChange}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
                    onClick={handlePersonalInformationButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Educational Details */}
            {visibility.educationDetails && (
              <div className="space-y-3 font-ddin">
                <h3 className="font-bold font-ddin">Education Details</h3>

                <fieldset className="flex flex-col gap-3">
                  <legend className="">
                    Highest Education Completed{" "}
                    <span className="text-red-600">*</span>
                  </legend>

                  <div className="flex flex-row gap-3">
                    <label
                      htmlFor="bachelors"
                      className="flex items-center gap-2"
                    >
                      <input
                        id="bachelors"
                        type="radio"
                        name="education"
                        value="Bachelors"
                        style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                        containerProps={{
                          className: "font-ddin",
                        }}
                        checked={formData.education === "Bachelors"}
                        onChange={handleChange}
                      />
                      Bachelors
                    </label>

                    <label
                      htmlFor="masters"
                      className="flex items-center gap-2"
                    >
                      <input
                        id="masters"
                        type="radio"
                        name="education"
                        value="Masters"
                        checked={formData.education === "Masters"}
                        onChange={handleChange}
                      />
                      Masters
                    </label>

                    <label htmlFor="others" className="flex items-center gap-2">
                      <input
                        id="others"
                        type="radio"
                        name="education"
                        value="others"
                        checked={formData.education === "others"}
                        onChange={handleChange}
                      />
                      others
                    </label>
                  </div>
                </fieldset>

                <Input
                  label="CGPA"
                  type="number"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
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
                  maxLength={10}
                  required
                />
                <Input
                  label="Year Passed"
                  type="number"
                  name="yearPassed"
                  value={formData.yearPassed}
                  onChange={handleChange}
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
                  maxLength={10}
                  required
                />
                <Input
                  label="GMAT Score"
                  type="number"
                  name="gmatScore"
                  maxLength={10}
                  value={formData.gmatScore}
                  onChange={handleChange}
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
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-[#494848] rounded-[10px] px-5 outline-none shadow-none hover:shadow-none border border-[#9e9b9a] hover:border-[#9e9b9a] hover:bg-[#9e9b9a] hover:text-white bg-transparent text-[#9e9b9a]"
                    onClick={() =>
                      setVisibility({
                        ...visibility,
                        personalInfo: true,
                        educationDetails: false,
                        preferences: false,
                        skills_and_expertise: false,
                      })
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
                    onClick={handleEducationDetailButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {visibility.preferences && (
              <div className="space-y-3 font-ddin">
                <h3 className="font-bold font-ddin">References</h3>
                <Input
                  label="Are you preparing for any course?"
                  name="preparingCourse"
                  value={formData.preparingCourse}
                  onChange={handleChange}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <Input
                  label="What are you currently working on?"
                  name="currentWork"
                  value={formData.currentWork}
                  onChange={handleChange}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <div className="text-left ">
                  <label className="block mb-2">
                    Can you commit 3 months full-time (8 hours/day) in
                    Hyderabad? <span className="text-red-600">*</span>
                  </label>
                  <Select
                    name="commitment"
                    label="commitment"
                    value={formData.commitment}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, commitment: value }))
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
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-[#494848] rounded-[10px] px-5 outline-none shadow-none hover:shadow-none border border-[#9e9b9a] hover:border-[#9e9b9a] hover:bg-[#9e9b9a] hover:text-white bg-transparent text-[#9e9b9a]"
                    onClick={() =>
                      setVisibility({
                        ...visibility,
                        personalInfo: false,
                        educationDetails: true,
                        preferences: false,
                        skills_and_expertise: false,
                      })
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
                    onClick={handlePreferenceButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Skills and Expertise */}
            {visibility.skills_and_expertise && (
              <div className="space-y-3 max-h-[350px] overflow-y-auto p-2 font-ddin">
                <h3 className="font-bold font-ddin">Skills and Expertise</h3>
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
                      value={formData[skill]}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, [skill]: value }))
                      }
                      required
                    >
                      {expertiseLevels.map((level) => (
                        <Option
                          key={level}
                          value={level}
                          style={{ fontFamily: "D-DIN" }}
                        >
                          {level}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ))}
                <div className="text-left mt-3 mb-3">
                  <label className="block text-gray-700 mb-1">
                    HackerRank Score
                  </label>
                  <Input
                    type="number"
                    label="HackerRank Score"
                    name="HackerRankScore"
                    value={formData.HackerRankScore}
                    onChange={handleChange}
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-[#494848] rounded-[10px] px-5 outline-none shadow-none hover:shadow-none border border-[#9e9b9a] hover:border-[#9e9b9a] hover:bg-[#9e9b9a] hover:text-white bg-transparent text-[#9e9b9a]"
                    onClick={() =>
                      setVisibility({
                        ...visibility,
                        personalInfo: false,
                        educationDetails: false,
                        preferences: true,
                        skills_and_expertise: false,
                      })
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
                    onClick={handleSkillsandExpertiseButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Additional Information */}
            {visibility.additional_information && (
              <div className="space-y-3 max-h-[300px] overflow-y-auto p-2 font-ddin">
                <h3 className="font-bold font-ddin">Additional Information</h3>
                <div className="text-left">
                  <label className="block mb-1 font-medium">Hobbies</label>
                  <Textarea
                    type="text"
                    label="Enter your hobbies"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hobbies: e.target.value,
                      }))
                    }
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    required
                  />
                </div>

                <div className="text-left ">
                  <label className="block mb-1 font-medium">
                    LinkedIn Profile URL
                  </label>
                  <Input
                    type="url"
                    label="Enter your LinkedIn profile URL"
                    name="linkedin"
                    value={formData.linkedin}
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        linkedin: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="block mb-1 font-medium">
                    GitHub or Other Source Code URL
                  </label>
                  <Input
                    type="url"
                    label="Enter your GitHub or other source code URL"
                    name="github"
                    value={formData.github}
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        github: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
                <div className="text-left">
                  <label className="block mb-1 font-medium">Resume</label>
                  <Input
                    type="file"
                    label="Upload your resume"
                    name="resume"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type !== "application/pdf") {
                        alert("Only PDF files are allowed.");
                        e.target.value = ""; // Clear the file input
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

                <div className="text-left">
                  <label className="block mb-1 font-medium">Cover Letter</label>
                  <Input
                    type="file"
                    label="Upload your cover letter"
                    name="coverLetter"
                    required
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        coverLetter: e.target.files[0],
                      }))
                    }
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

                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-[#494848] rounded-[10px] px-5 outline-none shadow-none hover:shadow-none border border-[#9e9b9a] hover:border-[#9e9b9a] hover:bg-[#9e9b9a] hover:text-white bg-transparent text-[#9e9b9a]"
                    onClick={() =>
                      setVisibility({
                        ...visibility,
                        personalInfo: false,
                        educationDetails: false,
                        preferences: false,
                        skills_and_expertise: true,
                        additional_information: false,
                      })
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
                    onClick={handleAdditionalInformation}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Family Details */}
            {visibility.family_details && (
              <div className="space-y-3 font-ddin">
                <div className="text-left">
                  <label className="block text-gray-700 mb-2">
                    Father's Occupation
                    <span className="text-sm text-gray-500 ml-1">
                      (e.g., job title, employer, or nature of work)
                    </span>
                  </label>
                  <Input
                    type="text"
                    name="fatherOccupation"
                    label="Father's Occupation"
                    value={formData.fatherOccupation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fatherOccupation: e.target.value,
                      }))
                    }
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-gray-700 mb-2">
                    Mother's Occupation
                    <span className="text-sm text-gray-500 ml-1">
                      (e.g., job title, employer, or nature of work)
                    </span>
                  </label>
                  <Input
                    type="text"
                    name="motherOccupation"
                    label="Mother's Occupation"
                    value={formData.motherOccupation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        motherOccupation: e.target.value,
                      }))
                    }
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-gray-700 mb-2">
                    Household Income
                  </label>
                  <Select
                    name="householdIncome"
                    label="Select Household Income"
                    value={formData.householdIncome}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        householdIncome: value,
                      }))
                    }
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
                        style={{ fontFamily: "font-ddin" }}
                      >
                        {income}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-[#494848] rounded-[10px] px-5 outline-none shadow-none hover:shadow-none border border-[#9e9b9a] hover:border-[#9e9b9a] hover:bg-[#9e9b9a] hover:text-white bg-transparent text-[#9e9b9a]"
                    onClick={() =>
                      setVisibility({
                        ...visibility,
                        personalInfo: false,
                        educationDetails: false,
                        preferences: false,
                        skills_and_expertise: false,
                        additional_information: true,
                        family_details: false,
                      })
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
                    onClick={handleButtonNavigate}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </form>

          <div className="text-center mt-4">
            <p className="font-myriad font-light">
              Already with us?{" "}
              <span
                className="font-ddin font-semibold cursor-pointer hover:text-[#E68242]"
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>{" "}
              and continue your journey!
            </p>
          </div>
        </div>

        <div className="flex-[1] bg-[#f5f5f5] hidden md:flex justify-center items-center">
          <img src={RegisterImg} alt="Sethu AI" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default CourseRegister;
