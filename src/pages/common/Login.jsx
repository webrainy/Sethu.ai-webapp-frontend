import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { mailPattern, strongPwd } from "../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginValid, setLoginValid] = useState({
    email: false,
    password: false,
  });
  const [passVisible, setPassVisible] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;

    if (mailPattern.test(value)) {
      setLoginValid({ ...loginValid, email: true });
    } else {
      setLoginValid({ ...loginValid, email: false });
    }
    setLoginData({ ...loginData, email: value });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (strongPwd.test(value)) {
      setLoginValid({ ...loginValid, password: true });
    } else {
      setLoginValid({ ...loginValid, password: false });
    }
    setLoginData({ ...loginData, password: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginValid.email) {
      return toast.error("Invalid email address.");
    }
    if (!loginValid.password) {
      return toast.error(
        "Password must have atleast 1 lowercase, number, special characters and minimum 8 characters."
      );
    }

    const result = await dispatch(
      login({ end_point: "/api/auth/login", login_data: loginData })
    ).unwrap();

    if (result.responseCode === 200) {
      if (result.responseData.role === 1) {
        navigate("/admin/dashboard");
        localStorage.setItem(
          "sethu_admin_access_token",
          result.responseData.access_token
        );
      // } else if (result.responseData.role === 2) {
      //   navigate("/student/dashboard");
      //   localStorage.setItem(
      //     "sethu_student_access_token",
      //     result.responseData.access_token
      //   );
      } else if (result.responseData.role === 3) {
        navigate("/reviewer/students");
        localStorage.setItem(
          "sethu_reviewer_access_token",
          result.responseData.access_token
        );
      } else {
        toast.error("Unauthorized access.");
      }
    } else {
      toast.error(result.responseMessage || "Login failed. Please try again.");
    }
  };

  const handlePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  return (
    <div>
      <h1 className="text-[40px] text-[#333] font-ddin font-semibold">
        Welcome Back!
      </h1>
      <p className="text-[16px] mb-[30px] text-[#333] font-myriad font-light">
        Sign in to continue to your account.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-4">
          <Input
            label="Your Email"
            type="email"
            size="lg"
            placeholder="name@mail.com"
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            containerProps={{
              className: "font-ddin",
            }}
            onChange={handleEmailChange}
            value={loginData.email}
            required
          />
          <Input
            label="Password"
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
            onChange={handlePasswordChange}
            value={loginData.password}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-4 text-[14px] tracking-[3px] font-montserrat font-ddin font-light hover:font-semibold transition-all bg-deep-orange-800 rounded-[10px] px-10 outline-none shadow-none hover:shadow-none border border-[#DD4633] hover:border-[#DD4633] hover:bg-[#DD4633] hover:text-white bg-transparent text-[#DD4633]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="font-myriad font-light">
            New here?{" "}
            <span
              className="font-ddin font-semibold cursor-pointer hover:text-[#E68242]"
              onClick={() => navigate("/course_registration")}
            >
              Create an account
            </span>{" "}
            and unlock endless possibilities!
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
