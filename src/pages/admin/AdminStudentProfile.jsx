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
    review_status: "",
    select_batch: "",
    comment: "",
    sk_python: "",
    sk_sql: "",
    sk_java: "",
    sk_analyticalskill: "",
    sk_prblmsolving: "",
    sk_engprof: "",
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
      })
    ).unwrap();

    dispatch(
      listReviewerItem({
        end_point: `/api/account/list_rev`,
        // end_point: `/api/account/list_admin`,
        access_token: access_token,
      })
    ).unwrap();

    if (location?.student) {
      setFormData({
        ...formData,
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
        date_exam: location?.student?.examInfo?.[0]?.exam_datetime || "",
        // date_exam: location?.student?.examInfo?.[0]?.exam_datetime
        //   ? new Date(location?.student?.examInfo?.[0]?.exam_datetime)
        //       .toISOString()
        //       .slice(0, 16)
        //   : "",
        exam_marks: location?.student?.examInfo?.[0]?.exam_marks || "",
        exam_result: location?.student?.examInfo?.[0]?.exam_result || "0",
        date_interview:
          location?.student?.interviewInfo?.[0]?.int_datetime || "",
        // date_interview: location?.student?.interviewInfo?.[0]?.int_datetime
        //   ? new Date(location?.student?.interviewInfo?.[0]?.int_datetime)
        //       .toISOString()
        //       .slice(0, 16)
        //   : "",
        interview_result:
          location?.student?.interviewInfo?.[0]?.int_result || "0",
        batch_assigned: location?.student?.batch_state || "",
        dnc_state: location?.student?.dnc_state || "",
      });
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

    const urlencoded = new URLSearchParams();

    urlencoded.append("current_state", formData.review_status);
    urlencoded.append("batch_state", formData.batch_assigned);
    if (formData.batch_assigned == 2) {
      urlencoded.append("batch_id", formData.select_batch);
    }
    urlencoded.append("dnc_state", formData.dnc_state);
    urlencoded.append("comment", formData.comment);
    if (Number(formData.review_status) !== 0) {
      urlencoded.append("account_id", formData.reviewer);
    }
    urlencoded.append("exam_datetime", formData.date_exam);
    urlencoded.append("exam_result", formData.exam_result);
    urlencoded.append("exam_marks", formData.exam_marks);
    urlencoded.append("int_datetime", formData.date_interview);
    urlencoded.append("int_result", formData.interview_result);

    const result = await dispatch(
      updateStudentData({
        end_point: `/api/student/update?student_id=${location?.student?.student_id}`,
        access_token: access_token,
        student_data: urlencoded,
      })
    ).unwrap();

    if (result.responseCode === 200) {
      toast.success("Student status updated.");
      navigate(-1);
    } else {
      toast.error(
        result.responseMessage || "Connection failed. Please try again."
      );
    }
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">Student Details</p>
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
              value={location?.student?.name || ""}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <div className="font-ddin">
              <p>Gender</p>
              <div className="flex flex-row gap-3 font-ddin">
                <Radio
                  name="gender"
                  label="Male"
                  value={"Male"}
                  checked={location?.student?.gender === "Male"}
                  disabled
                />
                <Radio
                  name="gender"
                  label="Female"
                  value={"Female"}
                  checked={location?.student?.gender === "Female"}
                  disabled
                />
                <Radio
                  name="gender"
                  label="Others"
                  value={"Others"}
                  checked={location?.student?.gender === "Others"}
                  disabled
                />
              </div>
            </div>
            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={
                location?.student?.dob
                  ? moment(location.student.dob).format("YYYY-MM-DD")
                  : ""
              }
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              label="Email"
              type="email"
              name="email"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={location?.student?.email || ""}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={location?.student?.phone || ""}
              maxLength={10}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            {/* <Textarea
              label="Location"
              name="location"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={location?.student?.location || ""}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            /> */}
            <Input
              label="City"
              type="text"
              name="city"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={location?.student?.city}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              label="District"
              type="text"
              name="district"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={location?.student?.district}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
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
                  checked={location?.student?.education === "Bachelors" || ""}
                  disabled
                />
                <Radio
                  name="education"
                  label="Masters"
                  value="Masters"
                  checked={location?.student?.education === "Masters" || ""}
                  disabled
                />
                <Radio
                  name="education"
                  label="Others"
                  value="Others"
                  checked={location?.student?.education === "Others" || ""}
                  disabled
                />
              </div>
            </div>
            <Input
              label="College Name"
              type="text"
              name="college_name"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              value={location?.student?.college}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              label="CGPA"
              type="number"
              name="cgpa"
              value={location?.student?.cgpa || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              className="appearance-none outline-none"
              required
              readOnly
            />
            <Input
              label="Year Passed"
              type="number"
              name="yearPassed"
              value={location?.student?.year_passed || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              label="GMAT Score"
              type="text"
              name="gmatScore"
              value={location?.student?.gmat || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
          </div>

          {/* Preferences */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Preferences</p>
            <Input
              label="Are you preparing for any course?"
              name="course_prep"
              value={location?.student?.course_prep || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              label="What are you currently working on?"
              name="curnt_work"
              value={location?.student?.curnt_work || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <div className="text-left">
              <label className="block mb-1 font-ddin">
                Can you commit 3 months full-time (8 hours/day) in Hyderabad?{" "}
                <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                name="commit_ft"
                value={location?.student?.commit_ft || ""}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                readOnly
              />
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
                value={location?.student?.hobbies || ""}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                required
                readOnly
              />
              <Input
                type="url"
                label="LinkedIn profile URL"
                name="linkedin_url"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                value={location?.student?.linkedin_url || ""}
                required
                readOnly
              />
              <Input
                type="url"
                label="Enter your GitHub or other source code URL"
                name="github_url"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                value={location?.student?.github_url || ""}
                required
                readOnly
              />

              <div className="flex justify-between items-center">
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
                <Input
                  type="text"
                  name={skill.name}
                  label={skill.label}
                  value={
                    formData[skill.name] == 1
                      ? "Beginner"
                      : formData[skill.name] == 2
                      ? "Intermediate"
                      : formData[skill.name] == 3
                      ? "Proficient"
                      : formData[skill.name] == 4
                      ? "Advanced"
                      : formData[skill.name] == 5
                      ? "Expert"
                      : "-"
                  }
                  style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                  containerProps={{
                    className: "font-ddin",
                  }}
                  required
                  readOnly
                />
              </div>
            ))}
            <Input
              label="Hacker Rank Score"
              type="text"
              name="hacker_rank"
              value={location?.student?.hckr_rnk || ""}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
          </div>

          {/* Other Information */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Other Information</p>
            <Input
              type="text"
              name="father_occ"
              label="Father's Occupation"
              value={location?.student?.father_occ}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              type="text"
              name="motherOccupation"
              label="Mother's Occupation"
              value={location?.student?.mother_occ}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
            />
            <Input
              type="text"
              name="income"
              label="Household Income"
              value={location?.student?.income}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
              readOnly
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
                containerProps={{
                  className: "font-ddin",
                }}
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
              type="datetime-local"
              name="date_exam"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
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
              containerProps={{
                className: "font-ddin",
              }}
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
              type="datetime-local"
              name="date_interview"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              value={formData.date_interview}
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
                  ? moment(location?.student?.registered_on).format("LLL") ||
                    "-"
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between items-center font-ddin">
              <p>Exam date</p>
              <p>
                {location?.student?.examInfo[0]?.exam_datetime
                  ? moment(
                      location?.student?.examInfo[0]?.exam_datetime
                    ).format("LLL") || "-"
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between items-center font-ddin">
              <p>Interview date</p>
              <p>
                {location?.student?.interviewInfo[0]?.int_datetime
                  ? moment(
                      location?.student?.interviewInfo[0]?.int_datetime
                    ).format("LLL") || "-"
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between items-center font-ddin">
              <p>Selected date</p>
              <p>
                {location?.student?.selected_on
                  ? moment(location?.student?.selected_on).format("LLL") || "-"
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
