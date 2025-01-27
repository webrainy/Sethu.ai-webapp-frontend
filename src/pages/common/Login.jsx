import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { mailPattern, strongPwd } from "../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
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

    // console.log(loginData, loginValid);
    if (!loginValid.email) {
      toast.error("Invalid email address.");
    } else if (!loginValid.password) {
      toast.error(
        "Password must have atleast 1 lowercase, number, special characters and minimum 8 characters."
      );
    } else {
      const result = await dispatch(login(loginData)).unwrap();
      console.log(result);
      navigate("/admin/dashboard");
    }
  };

  const handlePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };
  return (
    <div>
      <form
        className=" max-w-screen-lg w-72 lg:w-96 p-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-4">
          <Input
            label="Your Email"
            type="email"
            size="lg"
            placeholder="name@mail.com"
            style={{ fontFamily: "Montserrat", fontWeight: 500 }}
            containerProps={{
              className: "font-montserrat",
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
            style={{ fontFamily: "Montserrat", fontWeight: 500 }}
            containerProps={{
              className: "font-montserrat",
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
            className="mt-4 text-[14px] tracking-[3px] font-montserrat bg-deep-orange-800 rounded-none font-normal px-10 outline-none"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
