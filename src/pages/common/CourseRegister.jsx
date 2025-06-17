import React, { useState } from "react";
import { Button, Input, Radio, Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import {
  EXPERTISE_LEVELS,
  mailPattern,
  phoneNumber,
  strongPwd,
  urlRegex,
} from "../../utils/constants";
import toast from "react-hot-toast";
import RegisterImg from "../../assets/register_img.png";
import { useNavigate } from "react-router-dom";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authSlice";

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
    dob: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    city: "",
    district: "",
    education: "",
    college: "",
    cgpa: "",
    year_passed: "",
    gmat: "",
    course_prep: "",
    curnt_work: "",
    commit_ft: "",
    python: "",
    sql: "",
    java: "",
    analytical_skill: "",
    problem_solving: "",
    english_proficiency: "",
    hacker_rank: "",
    hobbies: "",
    linkedin_url: "",
    github_url: "",
    resume: "",
    coverletter: "",
    father_occ: "",
    mother_occ: "",
    income: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

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

  const handlePersonalInformationButton = () => {
    const {
      name,
      email,
      password,
      phone,
      location,
      dob,
      city,
      district,
      gender,
    } = formData;
    const mailRegex = new RegExp(mailPattern);
    const phoneRegex = new RegExp(phoneNumber);
    const passwordRegex = new RegExp(strongPwd);

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !location ||
      !dob ||
      !city ||
      !district ||
      !gender
    ) {
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
    const { education, cgpa, year_passed, gmat, college } = formData;
    if (!education || !cgpa || !year_passed || !gmat || !college) {
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
    const { course_prep, curnt_work, commit_ft } = formData;
    if (!course_prep || !curnt_work || !commit_ft) {
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
      python,
      java,
      sql,
      analytical_skill,
      problem_solving,
      english_proficiency,
      hacker_rank,
    } = formData;
    if (
      !python ||
      !java ||
      !sql ||
      !analytical_skill ||
      !problem_solving ||
      !english_proficiency ||
      !hacker_rank
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
    const { hobbies, linkedin_url, github_url, coverletter, resume } = formData;

    if (!hobbies || !linkedin_url || !github_url || !coverletter || !resume) {
      toast.error(
        "Please fill all fields in the Additional Information section."
      );
      return;
    }

    if (!urlRegex.test(linkedin_url)) {
      toast.error("Please enter a valid Linkedin url.");
      return;
    }

    if (!urlRegex.test(github_url)) {
      toast.error("Please enter a valid Github url.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", formData.name);
    form_data.append("dob", formData.dob);
    form_data.append("email", formData.email);
    form_data.append("password", formData.password);
    form_data.append("phone", `+91${formData.phone}`);
    form_data.append("location", formData.location);
    form_data.append("gender", formData.gender);
    form_data.append("city", formData.city);
    form_data.append("district", formData.district);
    form_data.append("education", formData.education);
    form_data.append("college", formData.college);
    form_data.append("cgpa", formData.cgpa);
    form_data.append("year_passed", formData.year_passed);
    form_data.append("gmat", formData.gmat);
    form_data.append("course_prep", formData.course_prep);
    form_data.append("curnt_work", formData.curnt_work);
    form_data.append("commit_ft", formData.commit_ft);
    form_data.append("sk_python", formData.python);
    form_data.append("sk_sql", formData.sql);
    form_data.append("sk_java", formData.java);
    form_data.append("sk_analyticalskill", formData.analytical_skill);
    form_data.append("sk_prblmsolving", formData.problem_solving);
    form_data.append("sk_engprof", formData.english_proficiency);
    form_data.append("hckr_rnk", formData.hacker_rank);
    form_data.append("hobbies", formData.hobbies);
    form_data.append("linkedin_url", formData.linkedin_url);
    form_data.append("github_url", formData.github_url);
    form_data.append("resume", formData.resume);
    if (formData.coverletter) {
      form_data.append("profile", formData.coverletter);
    }
    form_data.append("father_occ", formData.father_occ);
    form_data.append("mother_occ", formData.mother_occ);
    form_data.append("income", formData.income);

    const { father_occ, mother_occ, income } = formData;
    if (!father_occ || !mother_occ || !income) {
      toast.error("Please fill all fields.");
    } else {
      const result = await dispatch(
        register({ end_point: "/api/auth/register", register_data: form_data })
      ).unwrap();

      if (result.responseCode === 200) {
        toast.success("You're all set! Registration successful!");
        navigate("/login");
      } else {
        toast.error(
          result.responseMessage ||
            "Oops! Registration failed. Give it another shot!"
        );
      }
    }
  };

  return (
    <div className="bg-gradient-to-b home-hero-section flex justify-center items-center min-h-screen text-[#333]">
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
                />{" "}
                <fieldset className="flex flex-col gap-3">
                  <legend className="font-ddin">
                    Gender
                    <span className="text-red-600">*</span>
                  </legend>

                  <div className="flex flex-row gap-3 font-ddin">
                    <Radio
                      name="gender"
                      label="Male"
                      value={"Male"}
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />
                    <Radio
                      name="gender"
                      label="Female"
                      value={"Female"}
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    <Radio
                      name="gender"
                      label="Others"
                      value={"Others"}
                      checked={formData.gender === "Others"}
                      onChange={handleChange}
                    />
                  </div>
                </fieldset>
                <Input
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  value={formData.dob}
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
                <Input
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
                <Input
                  label="City"
                  name="city"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  value={formData.city}
                  onChange={handleChange}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <Input
                  label="District"
                  name="district"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  value={formData.district}
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
                    <Radio
                      name="education"
                      label="Bachelors"
                      value={"Bachelors"}
                      checked={formData.education === "Bachelors"}
                      onChange={handleChange}
                    />
                    <Radio
                      name="education"
                      label="Masters"
                      value={"Masters"}
                      checked={formData.education === "Masters"}
                      onChange={handleChange}
                    />
                    <Radio
                      name="education"
                      label="Others"
                      value={"Others"}
                      checked={formData.education === "Others"}
                      onChange={handleChange}
                    />
                  </div>
                </fieldset>
                <Input
                  label="College Name"
                  name="college"
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  value={formData.college}
                  onChange={handleChange}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
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
                  name="year_passed"
                  value={formData.year_passed}
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
                {/* <Input
                  label="GMAT Score"
                  type="text" // Changed to "text" to allow "NA"
                  name="gmat"
                  maxLength={10}
                  value={formData.gmat}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow numbers or "NA" (case-insensitive)
                    if (/^\d*$/.test(value) || value.toUpperCase() === "NA") {
                      handleChange(e); // Call the existing handleChange function
                    }
                  }}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  onKeyDown={(e) => {
                    // Prevent "e", "E", "-", and "+" keys
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
                /> */}
                <Input
                  label="GMAT Score"
                  placeholder="Enter NA if not applicable"
                  type="text"
                  name="gmat"
                  value={formData.gmat}
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
                  name="course_prep"
                  value={formData.course_prep}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                />
                <div className="text-left">
                  <label className="block mb-2">
                    Can you commit 3 months full-time (8 hours/day) in
                    Hyderabad? <span className="text-red-600">*</span>
                  </label>
                  <Select
                    name="commit_ft"
                    label="Commitment"
                    value={formData.commit_ft}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, commit_ft: value }))
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
                  { name: "python", label: "Python" },
                  { name: "sql", label: "SQL" },
                  { name: "java", label: "JAVA" },
                  { name: "analytical_skill", label: "Analytical skill" },
                  { name: "english_proficiency", label: "English proficiency" },
                  { name: "problem_solving", label: "Problem solving" },
                  // "sql",
                  // "java",
                  // "analytical_skill",
                  // "english_proficiency",
                  // "problem_solving",
                ].map((skill, i) => (
                  <div key={i} className="text-left">
                    <label className="block text-gray-700 mt-2 mb-[5px] font-ddin capitalize">
                      {/* {skill.replace(/([A-Z])/g, " $1")} */}
                      {skill.label}
                      <span className="text-red-600">*</span>
                    </label>
                    <Select
                      name={skill.name}
                      className="mb-2 font-ddin"
                      label={`Select Expertise for ${skill.label}`}
                      value={
                        formData[skill.name] !== undefined
                          ? String(formData[skill.name])
                          : ""
                      }
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          [skill.name]: Number(value),
                        }))
                      }
                      required
                    >
                      {EXPERTISE_LEVELS.map(({ label, value }) => (
                        <Option
                          key={value}
                          value={String(value)}
                          style={{ fontFamily: "D-DIN" }}
                        >
                          {label}
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
                    type="text"
                    placeholder="Enter NA if not applicable"
                    label="Hacker Rank Score"
                    name="hacker_rank"
                    value={formData.hacker_rank}
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
                  <label className="block mb-1 font-medium">Linkdin Url</label>
                  <Input
                    type="url"
                    label="Enter your linkedin url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        linkedin_url: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="block mb-1 font-medium">
                    GitHub Url or Other Source Code URL
                  </label>
                  <Input
                    type="url"
                    label="Enter your Github Url or other source code URL"
                    name="github_url"
                    value={formData.github_url}
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        github_url: e.target.value,
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
                      if (file) {
                        const allowedTypes = [
                          "application/pdf",
                          "application/msword",
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ];
                        const maxSize = 5 * 1024 * 1024; // 5MB in bytes

                        // Check file type
                        if (!allowedTypes.includes(file.type)) {
                          alert("Only PDF and DOC/DOCX files are allowed.");
                          e.target.value = ""; // Clear the input
                        }
                        // Check file size
                        else if (file.size > maxSize) {
                          alert("File size must be less than 5MB.");
                          e.target.value = ""; // Clear the input
                        }
                        // If valid, update form data
                        else {
                          setFormData((prev) => ({
                            ...prev,
                            resume: file,
                          }));
                        }
                      }
                    }}
                    accept=".pdf,.doc,.docx"
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
                  <label className="block mb-1 font-medium">Photo</label>
                  <Input
                    type="file"
                    label="Upload your photo"
                    name="coverletter"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.size > 5 * 1024 * 1024) {
                        // Check if file size is greater than 5MB
                        alert("File size must be less than 5MB"); // Display an error message
                        e.target.value = ""; // Clear the file input
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          coverletter: file,
                        }));
                      }
                    }}
                    accept=".jpg, .jpeg, .png, .bmp, .webp"
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                  />
                  <span className="font-ddin text-xs text-red-500">
                    Only images are allowed.
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
                    name="father_occ"
                    label="Father's Occupation"
                    value={formData.father_occ}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        father_occ: e.target.value,
                      }))
                    }
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    required
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
                    name="mother_occ"
                    label="Mother's Occupation"
                    value={formData.mother_occ}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        mother_occ: e.target.value,
                      }))
                    }
                    style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                    containerProps={{
                      className: "font-ddin",
                    }}
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="block text-gray-700 mb-2">
                    Household Income
                  </label>
                  <Select
                    name="income"
                    label="Select Household Income"
                    value={formData.income}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        income: value,
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
                        style={{ fontFamily: "D-DIN" }}
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
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
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
