import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LoginImg from "../../assets/orange_bg.jpg";
import { Button, Input, Textarea } from "@material-tailwind/react";

function CourseRegister() {
  const [visibility, setVisibility] = useState({
    personalInfo: true,
    educationDetails: false,
    preferences: false,
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("hi");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${LoginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-auto max-w-4xl shadow-2xl flex flex-col items-center justify-center py-8 pb-3 px-3 bg-white">
        <div className="w-72 lg:w-96 mb-5 text-center">
          <p className="font-bold text-xl sm:text-4xl text-gray-500 uppercase">
            Python Data Engineer{" "}
            <span className="font-bold text-xl sm:text-4xl text-black uppercase">
              {" "}
              Training
            </span>
          </p>

          <p className="tracking-[3px] text-gray-500 text-xs sm:text-base">
            Registration Form
          </p>
        </div>
        <form className="w-full p-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <h3 className="font-bold mb-4">Personal Information</h3>
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
            <Textarea
              label="Location"
              required
              value={formData.location}
              onChange={handleChange}
            />
            <div>
              <Button
                type="submit"
                onClick={() =>
                  setVisibility({
                    ...visibility,
                    personalInfo: false,
                    educationDetails: true,
                    preferences: false,
                  })
                }
              >
                Next
              </Button>
            </div>
          </div>
        </form>

        <div className="w-72 lg:w-96 text-center">
          <p className="text-gray-500">
            Thank you for getting back, please log in to your account by filling
            out this form:
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default CourseRegister;
