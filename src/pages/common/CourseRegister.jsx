import React, { useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { mailPattern } from "../../utils/constants";
import toast from "react-hot-toast";

function CourseRegister() {
  const [visibility, setVisibility] = useState({
    personalInfo: true,
    educationDetails: false,
    preferences: false,
    skills_and_expertise: false,
    additional_information: false,
    family_details: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    SQL: "",
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

  const expertiseLevels = [
    "Beginner",
    "Intermediate",
    "Proficient",
    "Advanced",
    "Expert",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("hi");
    const { hobbies, linkedin, github, coverLetter, resume } = formData;
    if (!hobbies || !linkedin || !github || !coverLetter || !resume) {
      toast.error(
        "Please fill all fields in the  Additional Information section."
      );
    }
  };

  const handlePersonalInformationButton = () => {
    const { name, email, phone, location } = formData;
    const mailRegex = new RegExp(mailPattern);

    if (!name || !email || !phone || !location) {
      toast.error(
        "Please fill all fields in the Personal Information section."
      );
      return;
    }

    if (!mailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
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
      SQL,
      AnalyticalSkills,
      ProblemSolving,
      EnglishProficiency,
      HackerRankScore,
    } = formData;
    if (
      !Python ||
      !Java ||
      !SQL ||
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
    if (!hobbies || !linkedin || !github || !coverLetter || !resume) {
      toast.error(
        "Please fill all fields in the  Additional Information section."
      );
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
                <h3 className="font-bold mb-4">Personal Information</h3>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
                <Textarea
                  label="Location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="mt-4 text-[14px] tracking-[3px] font-montserrat font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
                    onClick={handlePersonalInformationButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Educational Details */}
            {visibility.educationDetails && (
              <div className="space-y-3">
                <h3 className="font-bold mb-4">Education Details</h3>
                Highest Education Completed
                <div className="flex flex-row gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="education"
                      value="Bachelors"
                      checked={formData.education === "Bachelors"}
                      onChange={handleChange}
                      // className="h-4 w-4"
                    />
                    Bachelors
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="education"
                      value="Masters"
                      checked={formData.education === "Masters"}
                      onChange={handleChange}
                      // className="h-4 w-4"
                    />
                    Masters
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="education"
                      value="PhD"
                      checked={formData.education === "PhD"}
                      onChange={handleChange}
                      // className="h-4 w-4"
                    />
                    PhD
                  </label>
                </div>
                <Input
                  label="CGPA"
                  type="number"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
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
                  name="yearPassed"
                  value={formData.yearPassed}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  label="GMAT Score"
                  typeof="number"
                  name="gmatScore"
                  required
                  value={formData.gmatScore}
                  onChange={handleChange}
                />
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="bg-blue-gray-200 text-blue-gray-900"
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
                    className="bg-deep-orange-800"
                    onClick={handleEducationDetailButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {visibility.preferences && (
              <div className="space-y-3">
                <h3 className="font-bold mb-4">References</h3>
                <Input
                  label="Are you preparing for any course?"
                  name="preparingCourse"
                  value={formData.preparingCourse}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="What are you currently working on?"
                  name="currentWork"
                  value={formData.currentWork}
                  onChange={handleChange}
                  required
                />
                <div className="text-left">
                  <label className="block mb-1">
                    Can you commit 3 months full-time (8 hours/day) in
                    Hyderabad?
                  </label>
                  <Select
                    name="commitment"
                    label="commitment"
                    value={formData.commitment}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, commitment: value }))
                    }
                  >
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="bg-blue-gray-200 text-blue-gray-900"
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
                    className="bg-deep-orange-800"
                    onClick={handlePreferenceButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Skills and Expertise */}
            {visibility.skills_and_expertise && (
              <div className="space-y-3 max-h-[300px] overflow-y-auto p-2">
                <h3 className="font-bold mb-4">Skills and Expertise</h3>
                {[
                  "Python",
                  "Sql",
                  "Java",
                  "AnalyticalSkills",
                  "EnglishProficiency",
                  "ProblemSolving",
                ].map((skill) => (
                  <div key={skill} className="text-left">
                    <label className="block text-gray-700 mt-3 mb-1">
                      {skill.replace(/([A-Z])/g, " $1")}
                    </label>
                    <Select
                      name={skill}
                      className="mb-2"
                      label={`Select Expertise for ${skill}`}
                      value={formData[skill]}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, [skill]: value }))
                      }
                    >
                      {expertiseLevels.map((level) => (
                        <Option key={level} value={level}>
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
                    label="Enter your HackerRank Score"
                    name="HackerRankScore"
                    value={formData.HackerRankScore}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="bg-blue-gray-200 text-blue-gray-900"
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
                    className="bg-deep-orange-800"
                    onClick={handleSkillsandExpertiseButton}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Additional Information */}
            {visibility.additional_information && (
              <div className="space-y-3 max max-h-[300px] overflow-y-auto p-2">
                <h3 className="font-bold ">Additional Information</h3>
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
                  />
                </div>

                <div className="text-left">
                  <label className="block mb-1 font-medium">
                    LinkedIn Profile URL
                  </label>
                  <Input
                    type="url"
                    label="Enter your LinkedIn profile URL"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        linkedin: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        github: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="text-left">
                  <label className="block mb-1 font-medium">Resume</label>
                  <Input
                    type="file"
                    label="Upload your resume"
                    name="resume"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        resume: e.target.files[0],
                      }))
                    }
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                <div className="text-left">
                  <label className="block mb-1 font-medium">Cover Letter</label>
                  <Input
                    type="file"
                    label="Upload your cover letter"
                    name="coverLetter"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        coverLetter: e.target.files[0],
                      }))
                    }
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="bg-blue-gray-200 text-blue-gray-900"
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
                    className="bg-deep-orange-800"
                    onClick={handleAdditionalInformation}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Family Details */}
            {visibility.family_details && (
              <div className="space-y-3">
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
                      <Option key={income} value={income}>
                        {income}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="bg-blue-gray-200 text-blue-gray-900"
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
                  <Button type="submit" className="bg-deep-orange-800">
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="flex-[1] bg-[#f5f5f5] hidden md:flex justify-center items-center">
          <img
            src="https://undraw.co/illustrations/illustration.svg"
            alt="Sethu AI"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default CourseRegister;
