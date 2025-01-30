import {
  Button,
  Input,
  Option,
  Radio,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React from "react";
import { EXPERTISE_LEVELS } from "../../utils/constants";

function AdminStudentProfile() {
  const handleSubmit = async (e) => {
    e.preventDefault();
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
              // value={formData.name}
              // onChange={handleChange}
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
              // onChange={handleChange}
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
              // onChange={(e) => {
              //   const value = e.target.value.replace(/\D/g, "");
              //   if (value.length <= 10) {
              //     setFormData({ ...formData, phone: value });
              //   }
              // }}
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
              // onChange={handleChange}
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
              //   value={formData.cgpa}
              //   onChange={handleChange}
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
              name="yearPassed"
              //   value={formData.yearPassed}
              //   onChange={handleChange}
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
              name="gmatScore"
              //   value={formData.gmatScore}
              //   onChange={handleChange}
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
            {/* References */}
            <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
              <p className="font-ddin font-semibold text-lg">References</p>
              <Input
                label="Are you preparing for any course?"
                name="preparingCourse"
                // value={formData.preparingCourse}
                // onChange={handleChange}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                required
              />
              <Input
                label="What are you currently working on?"
                name="currentWork"
                // value={formData.currentWork}
                // onChange={handleChange}
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
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
                  //   value={formData.commitment}
                  //   onChange={(value) =>
                  //     setFormData((prev) => ({ ...prev, commitment: value }))
                  //   }
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
                //   value={formData.hobbies}
                //   onChange={(e) =>
                //     setFormData((prev) => ({
                //       ...prev,
                //       hobbies: e.target.value,
                //     }))
                //   }
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
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
                //   onChange={(e) => {
                //     setFormData((prev) => ({
                //       ...prev,
                //       linkedin: e.target.value,
                //     }));
                //   }}
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
                //   onChange={(e) => {
                //     setFormData((prev) => ({
                //       ...prev,
                //       github: e.target.value,
                //     }));
                //   }}
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
                  // onChange={(value) =>
                  //   setFormData((prev) => ({ ...prev, [skill]: value }))
                  // }
                  required
                >
                  {EXPERTISE_LEVELS.map((level) => (
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
          </div>

          {/* Other Information */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Other Information</p>
            <Input
              type="text"
              name="fatherOccupation"
              label="Father's Occupation"
              // value={formData.fatherOccupation}
              // onChange={(e) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     fatherOccupation: e.target.value,
              //   }))
              // }
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
            />
            <Input
              type="text"
              name="motherOccupation"
              label="Mother's Occupation"
              // value={formData.motherOccupation}
              // onChange={(e) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     motherOccupation: e.target.value,
              //   }))
              // }
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              required
            />
            <Select
              name="householdIncome"
              label="Select Household Income"
              // value={formData.householdIncome}
              // onChange={(value) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     householdIncome: value,
              //   }))
              // }
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

          {/* Remarks */}
          <div className="shadow-md bg-white p-4 rounded-xl flex flex-col gap-3 h-fit">
            <p className="font-ddin font-semibold text-lg">Remarks</p>
            <Select
              name="review_status"
              label="Select Review Status"
              // value={formData.householdIncome}
              // onChange={(value) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     householdIncome: value,
              //   }))
              // }
            >
              {[
                "Assigned",
                "In Progress",
                "Accepted",
                "Rejected",
                "Unable to Decide",
              ].map((status) => (
                <Option
                  key={status}
                  value={status}
                  style={{ fontFamily: "D-DIN" }}
                >
                  {status}
                </Option>
              ))}
            </Select>
            <Select
              name="review_status"
              label="Select a Batch"
              // value={formData.householdIncome}
              // onChange={(value) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     householdIncome: value,
              //   }))
              // }
            >
              {["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"].map(
                (batch) => (
                  <Option
                    key={batch}
                    value={batch}
                    style={{ fontFamily: "D-DIN" }}
                  >
                    {batch}
                  </Option>
                )
              )}
            </Select>
            <Textarea
              label="Final Comments"
              name="final_comments"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              // value={formData.location}
              // onChange={handleChange}
              containerProps={{
                className: "font-ddin",
              }}
              // defaultValue={"Classes near Khairtabad Metro Station, Hyderbad."}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 mb-10 gap-4">
          <Button
            type="button"
            className="text-[14px] tracking-[3px] font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
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

export default AdminStudentProfile;
