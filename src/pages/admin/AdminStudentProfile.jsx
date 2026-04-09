import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Radio,
  Select,
  Textarea,
} from "@material-tailwind/react";
import {
  base_url,
  BATCH_STATUS,
  EXAM_INTERVIEW_STATUS,
  GOT_TO_KNOW_FROM,
  REVIEW_STATUS,
} from "../../utils/constants";
import { fetchBatchItems } from "../../redux/batchSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentData } from "../../redux/studentSlice";
import toast from "react-hot-toast";
import { listReviewerItem } from "../../redux/reviewerSlice";
import moment from "moment/moment";

function AdminStudentProfile() {
  const location = useLocation().state;
  const dispatch = useDispatch();
  const { batch_items } = useSelector((state) => state.batch);
  const { reviewer_item } = useSelector((state) => state.reviewer);
  const { loading } = useSelector((state) => state.student);
  const maxCharacterLimit = 500;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const [formData, setFormData] = useState({
    name: location.student.name || "",
    gender: location.student.gender || "",
    dob: location.student.dob
      ? moment(location.student.dob).format("YYYY-MM-DD")
      : "",
    email: location.student.email || "",
    phone: location.student.phone || "",
    city: location.student.city || "",
    district: location.student.district || "",
    education: location.student.education || "",
    college: location.student.college || "",
    cgpa: location.student.cgpa || "",
    year_passed: location.student.year_passed || "",
    gmat: location.student.gmat || "",
    course_prep: location.student.course_prep || "",
    curnt_work: location.student.curnt_work || "",
    commit_ft: location.student.commit_ft || "",
    hobbies: location.student.hobbies || "",
    linkedin_url: location.student.linkedin_url || "",
    github_url: location.student.github_url || "",
    hckr_rnk: location.student.hckr_rnk || "",
    father_occ: location.student.father_occ || "",
    mother_occ: location.student.mother_occ || "",
    income: location.student.income || "",

    review_status: location.student.review_status || "",
    select_batch: location.student.select_batch || "",
    comment: location.student.comment || "",
    sk_python: location.student.sk_python || "",
    sk_sql: location.student.sk_sql || "",
    sk_java: location.student.sk_java || "",
    sk_analyticalskill: location.student.sk_analyticalskill || "",
    sk_prblmsolving: location.student.sk_prblmsolving || "",
    sk_engprof: location.student.sk_engprof || "",
    iq_level: location.student.iq_level || "",
    attitude: location.student.attitude || "",
    aspiration: location.student.aspiration || "",
    has_laptop: location.student.has_laptop || "",
    got_to_know_from: location.student.got_to_know_from || "", // CHANGED: was course_source
    referedby: location.student.referedby || "",
    reviewer: "",
    date_exam: "",
    exam_marks: "",
    exam_result: "",
    date_interview: "",
    interview_result: "",
    batch_assigned: "",
    dnc_state: "",
  });

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: "/api/batch/list",
        access_token: access_token,
      }),
    ).unwrap();

    dispatch(
      listReviewerItem({
        end_point: `/api/account/list_rev`,
        access_token: access_token,
      }),
    ).unwrap();

    if (location?.student) {
      setFormData((prev) => ({
        ...prev,
        review_status: location?.student?.current_state || "0",
        select_batch: location?.student?.batchInfo?.batch_id || "",
        comment: location?.student?.comment || "",
        sk_python: location?.student?.sk_python || "",
        sk_sql: location?.student?.sk_sql || "",
        sk_java: location?.student?.sk_java || "",
        sk_analyticalskill: location?.student?.sk_analyticalskill || "",
        sk_prblmsolving: location?.student?.sk_prblmsolving || "",
        sk_engprof: location?.student?.sk_engprof || "",
        reviewer: location?.student?.reviewerInfo?.account_id || "",

        date_exam: location?.student?.examInfo?.[0]?.exam_datetime
          ? location.student.examInfo[0].exam_datetime.substring(0, 10)
          : "",

        exam_marks: location?.student?.examInfo?.[0]?.exam_marks || "",
        exam_result: location?.student?.examInfo?.[0]?.exam_result || "0",

        date_interview: location?.student?.interviewInfo?.[0]?.int_datetime
          ? location.student.interviewInfo[0].int_datetime.substring(0, 10)
          : "",

        interview_result:
          location?.student?.interviewInfo?.[0]?.int_result || "0",
        batch_assigned: location?.student?.batch_state || "",
        dnc_state: location?.student?.dnc_state || "",

        iq_level: location.student.iq_level || "",
        attitude: location.student.attitude || "",
        aspiration: location.student.aspiration || "",
        has_laptop: location.student.has_laptop || "",
        got_to_know_from: location.student.got_to_know_from || "", // CHANGED: was course_source
        referedby: location.student.referedby || "",
      }));
    }
  }, [dispatch, location]);

  const handleInputChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = new URLSearchParams();
    const stateData = new URLSearchParams();

    // 1. Profile fields (to /api/student/edit)
    profileData.append("name", formData.name);
    profileData.append("gender", formData.gender);
    profileData.append("dob", formData.dob);
    profileData.append("email", formData.email);
    profileData.append("phone", formData.phone);
    profileData.append("city", formData.city);
    profileData.append("district", formData.district);
    profileData.append("education", formData.education);
    profileData.append("college", formData.college);
    profileData.append("cgpa", formData.cgpa);
    profileData.append("year_passed", formData.year_passed);
    profileData.append("gmat", formData.gmat);
    profileData.append("course_prep", formData.course_prep);
    profileData.append("curnt_work", formData.curnt_work);
    profileData.append("commit_ft", formData.commit_ft);
    profileData.append("hobbies", formData.hobbies);
    profileData.append("linkedin_url", formData.linkedin_url);
    profileData.append("github_url", formData.github_url);
    profileData.append("father_occ", formData.father_occ);
    profileData.append("mother_occ", formData.mother_occ);
    profileData.append("income", formData.income);
    profileData.append("hckr_rnk", formData.hckr_rnk);
    profileData.append("sk_python", formData.sk_python);
    profileData.append("sk_sql", formData.sk_sql);
    profileData.append("sk_java", formData.sk_java);
    profileData.append("sk_analyticalskill", formData.sk_analyticalskill);
    profileData.append("sk_prblmsolving", formData.sk_prblmsolving);
    profileData.append("sk_engprof", formData.sk_engprof);
    profileData.append("review_status", formData.review_status);
    profileData.append("reviewer", formData.reviewer);
    profileData.append("comment", formData.comment);
    profileData.append("iq_level", formData.iq_level);
    profileData.append("attitude", formData.attitude);
    profileData.append("aspiration", formData.aspiration);
    profileData.append("has_laptop", formData.has_laptop);
    profileData.append("got_to_know_from", formData.got_to_know_from); // CHANGED
    if (formData.got_to_know_from === "Referral") {
      // CHANGED
      profileData.append("referedby", formData.referedby);
    }

    // 2. State fields (to /api/student/update)
    stateData.append("current_state", formData.review_status);
    stateData.append("batch_state", formData.batch_assigned);
    if (formData.batch_assigned == 2) {
      stateData.append("batch_id", formData.select_batch);
    }
    stateData.append("dnc_state", formData.dnc_state);
    stateData.append("comment", formData.comment);
    if (Number(formData.review_status) !== 0) {
      stateData.append("account_id", formData.reviewer);
    }
    if (formData.date_exam) {
      stateData.append("exam_datetime", `${formData.date_exam}T00:00:00`);
    }
    stateData.append("exam_result", formData.exam_result);
    stateData.append("exam_marks", formData.exam_marks);
    stateData.append("int_datetime", formData.date_interview);
    stateData.append("int_result", formData.interview_result);

    try {
      const profileResult = await dispatch(
        updateStudentData({
          end_point: `/api/student/edit?student_id=${location?.student?.student_id}`,
          access_token: access_token,
          student_data: profileData,
        }),
      ).unwrap();

      if (profileResult.responseCode !== 200) {
        throw new Error(
          profileResult.responseMessage || "Profile update failed",
        );
      }

      const stateResult = await dispatch(
        updateStudentData({
          end_point: `/api/student/update?student_id=${location?.student?.student_id}`,
          access_token: access_token,
          student_data: stateData,
        }),
      ).unwrap();

      if (stateResult.responseCode === 200) {
        toast.success("Student data updated successfully.");
        navigate(-1);
      } else {
        throw new Error(stateResult.responseMessage || "State update failed");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">
          Student Details{" "}
          {location?.student?.rollno
            ? "(" + location?.student?.rollno + ")"
            : ""}
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
              value={formData.name}
              onChange={(e) => handleInputChange(e.target.value, "name")}
              containerProps={{ className: "font-ddin" }}
              required
            />

            <div className="font-ddin">
              <p>Gender</p>
              <div className="flex flex-row gap-3 font-ddin">
                <Radio
                  name="gender"
                  label="Male"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={() => handleInputChange("Male", "gender")}
                />
                <Radio
                  name="gender"
                  label="Female"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={() => handleInputChange("Female", "gender")}
                />
                <Radio
                  name="gender"
                  label="Others"
                  value="Others"
                  checked={formData.gender === "Others"}
                  onChange={() => handleInputChange("Others", "gender")}
                />
              </div>
            </div>

            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={formData.dob}
              onChange={(e) => handleInputChange(e.target.value, "dob")}
              containerProps={{ className: "font-ddin" }}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.value, "email")}
              containerProps={{ className: "font-ddin" }}
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
              containerProps={{ className: "font-ddin" }}
              required
            />

            <Input
              label="City"
              type="text"
              name="city"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={formData.city}
              onChange={(e) => handleInputChange(e.target.value, "city")}
              containerProps={{ className: "font-ddin" }}
              required
            />

            <Input
              label="District"
              type="text"
              name="district"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={formData.district}
              onChange={(e) => handleInputChange(e.target.value, "district")}
              containerProps={{ className: "font-ddin" }}
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
                  onChange={handleChange}
                />
                <Radio
                  name="education"
                  label="Masters"
                  value="Masters"
                  checked={formData.education === "Masters"}
                  onChange={handleChange}
                />
                <Radio
                  name="education"
                  label="Others"
                  value="Others"
                  checked={formData.education === "Others"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Input
              label="IQ Level"
              name="iq_level"
              value={formData.iq_level}
              onChange={(e) => handleInputChange(e.target.value, "iq_level")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
            />
            <Input
              label="College Name"
              type="text"
              name="college"
              value={formData.college}
              onChange={(e) => handleInputChange(e.target.value, "college")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              required
            />
            <Input
              label="CGPA"
              type="number"
              name="cgpa"
              value={formData.cgpa}
              onChange={(e) => handleInputChange(e.target.value, "cgpa")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              className="appearance-none outline-none"
              required
            />
            <Input
              label="Year Passed"
              type="number"
              name="year_passed"
              value={formData.year_passed}
              onChange={(e) => handleInputChange(e.target.value, "year_passed")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              required
            />
            <Input
              label="GMAT Score"
              type="text"
              name="gmat"
              value={formData.gmat}
              onChange={(e) => handleInputChange(e.target.value, "gmat")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              required
            />
          </div>

          {/* References */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">References</p>
            <Input
              label="Are you preparing for any course?"
              name="course_prep"
              value={formData.course_prep || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              onChange={(e) => handleInputChange(e.target.value, "course_prep")}
              containerProps={{ className: "font-ddin" }}
              required
            />
            <Input
              label="What are you currently working on?"
              name="curnt_work"
              value={formData.curnt_work || ""}
              onChange={(e) => handleInputChange(e.target.value, "curnt_work")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              required
            />
            <div className="text-left">
              <label className="block mb-1 font-ddin">
                Can you commit 3 months full-time (8 hours/day) in Hyderabad?{" "}
                <span className="text-red-600">*</span>
              </label>
              <Input
                label="Commit"
                type="text"
                name="commit_ft"
                value={formData.commit_ft || ""}
                onChange={(e) => handleInputChange(e.target.value, "commit_ft")}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{ className: "font-ddin" }}
              />
            </div>

            {/* Additional Information */}
            <div className="flex flex-col gap-3 h-fit mt-4">
              <p className="font-ddin font-semibold text-lg">
                Additional Information
              </p>
              <Textarea
                type="text"
                label="Hobbies"
                name="hobbies"
                value={formData.hobbies || ""}
                onChange={(e) => handleInputChange(e.target.value, "hobbies")}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{ className: "font-ddin" }}
                required
              />
              <Input
                type="url"
                label="LinkedIn profile URL"
                name="linkedin_url"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{ className: "font-ddin" }}
                value={formData.linkedin_url || ""}
                onChange={(e) =>
                  handleInputChange(e.target.value, "linkedin_url")
                }
              />
              <Input
                type="url"
                label="Enter your GitHub or other source code URL"
                name="github_url"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{ className: "font-ddin" }}
                value={formData.github_url || ""}
                onChange={(e) =>
                  handleInputChange(e.target.value, "github_url")
                }
              />

              <div className="flex justify-between items-center">
                {location?.student?.resume && (
                  <div className="flex flex-col gap-1">
                    <p className="text-center font-ddin">Resume</p>
                    <Button
                      onClick={() =>
                        window.open(base_url + location?.student?.resume)
                      }
                      className="shadow-none py-2 hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
                    >
                      Download
                    </Button>
                  </div>
                )}
                {location?.student?.profile && (
                  <div className="flex flex-col gap-1">
                    <p className="text-center font-ddin">Photo</p>
                    <Button
                      onClick={() =>
                        window.open(base_url + location?.student?.profile)
                      }
                      className="shadow-none py-2 hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
                    >
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <Input
                label="Attitude"
                name="attitude"
                value={formData.attitude}
                onChange={(e) => handleInputChange(e.target.value, "attitude")}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{ className: "font-ddin" }}
              />
              <Input
                label="Aspiration"
                name="aspiration"
                value={formData.aspiration}
                onChange={(e) =>
                  handleInputChange(e.target.value, "aspiration")
                }
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{ className: "font-ddin" }}
              />

              <Select
                name="has_laptop"
                label="Has Laptop"
                value={formData.has_laptop}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, has_laptop: value }))
                }
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{ className: "font-ddin" }}
              >
                <Option value="Yes" className="font-ddin">
                  Yes
                </Option>
                <Option value="No" className="font-ddin">
                  No
                </Option>
              </Select>

              {/* CHANGED: course_source → got_to_know_from, maps GOT_TO_KNOW_FROM constant (all 9 options) */}
              <div className="text-left">
                <label className="block text-gray-700 mt-2 mb-[5px] font-ddin capitalize">
                  How did you know about the program?
                  <span className="text-red-600">*</span>
                </label>
                <Select
                  label="How did you know about the program?"
                  value={formData.got_to_know_from}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      got_to_know_from: value,
                      referedby: value !== "Referral" ? "" : prev.referedby, // CHANGED
                    }))
                  }
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{ className: "font-ddin" }}
                >
                  {GOT_TO_KNOW_FROM.map(({ label, value }) => (
                    <Option key={value} value={value} className="font-ddin">
                      {label}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* CHANGED: course_source === "3" → got_to_know_from === "Referral" */}
              {formData.got_to_know_from === "Referral" && (
                <Input
                  label="Referred by Volunteer"
                  name="referedby"
                  value={formData.referedby}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "referedby")
                  }
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{ className: "font-ddin" }}
                  required
                />
              )}
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
              { name: "sk_prblmsolving", label: "Problem Solving" },
            ].map((skill) => (
              <div key={skill.name} className="text-left">
                <label className="block text-gray-700 mt-2 mb-[5px] font-ddin capitalize">
                  {skill.label}
                  <span className="text-red-600">*</span>
                </label>
                <Select
                  label={skill.label}
                  value={formData[skill.name]?.toString() || ""}
                  onChange={(value) => handleInputChange(value, skill.name)}
                  className="font-ddin"
                >
                  <Option value="1" className="font-ddin">
                    Beginner
                  </Option>
                  <Option value="2" className="font-ddin">
                    Intermediate
                  </Option>
                  <Option value="3" className="font-ddin">
                    Proficient
                  </Option>
                  <Option value="4" className="font-ddin">
                    Advanced
                  </Option>
                  <Option value="5" className="font-ddin">
                    Expert
                  </Option>
                </Select>
              </div>
            ))}
            <Input
              label="Hacker Rank Score"
              type="text"
              name="hckr_rnk"
              value={formData.hckr_rnk || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              onChange={(e) => handleInputChange(e.target.value, "hckr_rnk")}
              required
            />
          </div>

          {/* Other Information */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Other Information</p>
            <Input
              type="text"
              name="father_occ"
              label="Father's Occupation"
              value={formData.father_occ}
              onChange={(e) => handleInputChange(e.target.value, "father_occ")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              required
            />
            <Input
              type="text"
              name="mother_occ"
              label="Mother's Occupation"
              value={formData.mother_occ}
              onChange={(e) => handleInputChange(e.target.value, "mother_occ")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              required
            />
            <Input
              type="text"
              name="income"
              label="Household Income"
              value={formData.income}
              onChange={(e) => handleInputChange(e.target.value, "income")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              required
            />
          </div>

          {/* Manage status & reviewer */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">
              Manage status & reviewer
            </p>
            <Select
              label="Select Review Status"
              value={String(formData.review_status)}
              onChange={(value) => handleInputChange(value, "review_status")}
            >
              {REVIEW_STATUS.map((status, i) => (
                <Option
                  key={i}
                  value={String(status.value)}
                  style={{ fontFamily: "D-DIN" }}
                >
                  {status.label}
                </Option>
              ))}
            </Select>

            {Number(formData.review_status) !== 0 && (
              <Select
                label="Select a reviewer"
                value={String(formData.reviewer) || ""}
                onChange={(value) => handleInputChange(value, "reviewer")}
              >
                {reviewer_item.map((reviewer, i) => (
                  <Option
                    key={reviewer.account_id}
                    value={String(reviewer.account_id)}
                    style={{ fontFamily: "D-DIN" }}
                  >
                    {reviewer.name}
                  </Option>
                ))}
              </Select>
            )}

            <div className="flex flex-col">
              <Textarea
                label="Final Comments"
                name="comment"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                value={formData.comment}
                onChange={(e) => handleInputChange(e.target.value, "comment")}
                containerProps={{ className: "font-ddin" }}
                maxLength={maxCharacterLimit}
              />
              <p className="text-right text-sm font-myriad font-light">
                {formData.comment.length}/{maxCharacterLimit}
              </p>
            </div>

            <Checkbox
              color="blue"
              label="Do Not Call Again"
              labelProps={{ className: "font-ddin" }}
              checked={formData.dnc_state == 1 ? false : true}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  dnc_state: e.target.checked ? 2 : 1,
                }));
              }}
            />
          </div>

          {/* Assign exam */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Assign exam</p>
            <Input
              label="Date of Exam"
              type="date"
              name="date_exam"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              value={formData.date_exam}
              onChange={(e) => handleInputChange(e.target.value, "date_exam")}
            />
            <Input
              label="Exam Marks"
              type="number"
              name="exam_marks"
              value={formData.exam_marks}
              onChange={(e) => handleInputChange(e.target.value, "exam_marks")}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
            />
            <Select
              label="Select a result"
              value={String(formData.exam_result)}
              onChange={(value) => handleInputChange(value, "exam_result")}
            >
              {EXAM_INTERVIEW_STATUS.map((result) => (
                <Option
                  key={result.value}
                  value={String(result.value)}
                  style={{ fontFamily: "D-DIN" }}
                >
                  {result.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Assign interview */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Assign interview</p>
            <Input
              label="Date of Interview"
              type="date"
              name="date_interview"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
              value={
                formData.date_interview
                  ? new Date(formData.date_interview)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleInputChange(e.target.value, "date_interview")
              }
            />
            <Select
              label="Select a result"
              value={String(formData.interview_result)}
              onChange={(value) => handleInputChange(value, "interview_result")}
            >
              {EXAM_INTERVIEW_STATUS.map((result) => (
                <Option
                  key={result.value}
                  value={String(result.value)}
                  style={{ fontFamily: "D-DIN" }}
                >
                  {result.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Assign batch */}
          {formData.exam_result == 1 && formData.interview_result == 1 && (
            <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
              <p className="font-ddin font-semibold text-lg">Assign batch</p>
              <Select
                label="Is batch assigned?"
                value={String(formData.batch_assigned)}
                onChange={(value) => handleInputChange(value, "batch_assigned")}
              >
                {BATCH_STATUS.map((result) => (
                  <Option
                    key={result.value}
                    value={String(result.value)}
                    style={{ fontFamily: "D-DIN" }}
                  >
                    {result.label}
                  </Option>
                ))}
              </Select>
              {formData.batch_assigned == 2 && (
                <Select
                  label="Select a batch"
                  value={String(formData.select_batch)}
                  onChange={(value) => handleInputChange(value, "select_batch")}
                >
                  {batch_items.map((batch) => (
                    <Option
                      key={batch.batch_id}
                      value={String(batch.batch_id)}
                      style={{ fontFamily: "D-DIN" }}
                    >
                      {batch.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          )}

          {/* important dates */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Important Dates</p>
            <div className="flex justify-between items-center font-ddin">
              <p>Application submitted</p>
              <p>
                {location?.student?.registered_on
                  ? moment(location?.student?.registered_on).format("LL") || "-"
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between items-center font-ddin">
              <p>Exam date</p>
              <p>
                {location?.student?.examInfo[0]?.exam_datetime
                  ? moment(
                      location?.student?.examInfo[0]?.exam_datetime,
                    ).format("LL") || "-"
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between items-center font-ddin">
              <p>Interview date</p>
              <p>
                {location?.student?.interviewInfo[0]?.int_datetime
                  ? moment(
                      location?.student?.interviewInfo[0]?.int_datetime,
                    ).format("LL") || "-"
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between items-center font-ddin">
              <p>Selected date</p>
              <p>
                {location?.student?.selected_on
                  ? moment(location?.student?.selected_on).format("LL") || "-"
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 mb-10 gap-4">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-[#494848] rounded-[10px] px-12 outline-none shadow-none hover:shadow-none border border-[#9e9b9a] hover:border-[#9e9b9a] hover:bg-[#9e9b9a] hover:text-white bg-transparent text-[#9e9b9a]"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
            loading={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminStudentProfile;
