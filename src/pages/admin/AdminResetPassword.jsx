import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { strongPwd } from "../../utils/constants";
import toast from "react-hot-toast";
import { changePassword } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

function AdminResetPassword() {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [isValid, setIsValid] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "old_password") {
      if (strongPwd.test(value)) {
        setIsValid({ ...isValid, old_password: true });
      } else {
        setIsValid({ ...isValid, old_password: false });
      }
    } else if (name === "new_password") {
      if (strongPwd.test(value)) {
        setIsValid({ ...isValid, new_password: true });
      } else {
        setIsValid({ ...isValid, new_password: false });
      }
    } else if (name === "confirm_password") {
      if (strongPwd.test(value)) {
        setIsValid({ ...isValid, confirm_password: true });
      } else {
        setIsValid({ ...isValid, confirm_password: false });
      }
    }

    setData({ ...data, [name]: value });
  };

  const handleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };
  const handleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid.old_password) {
      toast.error(
        "Old Password must have atleast 1 lowercase, number, special characters and minimum 8 characters."
      );
    } else if (!isValid.new_password) {
      toast.error(
        "New Password must have atleast 1 lowercase, number, special characters and minimum 8 characters."
      );
    } else if (data.new_password !== data.confirm_password) {
      toast.error("New password and Confirm password must be same.");
    } else {
      const result = await dispatch(
        changePassword({
          end_point: "/api/auth/change_pass",
          item_data: {
            old_password: data.old_password,
            new_password: data.new_password,
            confirm_password: data.confirm_password,
          },
          access_token: access_token,
        })
      ).unwrap();
      if (result.responseCode === 200) {
        toast.success("Password changed successfully.");
        setData({
          ...data,
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        toast.error(
          result.responseMessage || "Login failed. Please try again."
        );
      }
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">Reset Password</p>
        </div>

        <div className=" mt-4 flex justify-center">
          <form
            className="flex flex-col gap-3 bg-white rounded-xl p-4"
            onSubmit={handleSubmit}
          >
            <Input
              label="Old password"
              className="p-3 w-[500px]"
              name="old_password"
              type={!oldPasswordVisible ? "password" : "text"}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={handleChange}
              value={data?.old_password}
              icon={
                !oldPasswordVisible ? (
                  <TbEyeOff
                    onClick={handleOldPasswordVisibility}
                    className="cursor-pointer"
                  />
                ) : (
                  <TbEye
                    onClick={handleOldPasswordVisibility}
                    className="cursor-pointer"
                  />
                )
              }
              required
            />
            <Input
              label="New password"
              className="p-3 w-[500px]"
              name="new_password"
              type={!newPasswordVisible ? "password" : "text"}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={handleChange}
              value={data?.new_password}
              icon={
                !newPasswordVisible ? (
                  <TbEyeOff
                    onClick={handleNewPasswordVisibility}
                    className="cursor-pointer"
                  />
                ) : (
                  <TbEye
                    onClick={handleNewPasswordVisibility}
                    className="cursor-pointer"
                  />
                )
              }
              required
            />
            <Input
              label="Confirm password"
              className="p-3 w-[500px]"
              name="confirm_password"
              type={!confirmPasswordVisible ? "password" : "text"}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={handleChange}
              value={data?.confirm_password}
              icon={
                !confirmPasswordVisible ? (
                  <TbEyeOff
                    onClick={handleConfirmPasswordVisibility}
                    className="cursor-pointer"
                  />
                ) : (
                  <TbEye
                    onClick={handleConfirmPasswordVisibility}
                    className="cursor-pointer"
                  />
                )
              }
              required
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633] disabled:cursor-not-allowed"
                // loading={loading}
              >
                {/* {loading ? "Loading..." : data?.editable ? "Update" : "Submit"} */}
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminResetPassword;
