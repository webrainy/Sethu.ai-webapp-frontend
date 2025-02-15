import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailPattern, phoneNumber, strongPwd } from "../../utils/constants";
import { listReviewerItem, postReviewerItem } from "../../redux/reviewerSlice";
import toast from "react-hot-toast";
import ManageModalReviewer from "../../components/modal/admin/ManageModalReviewer";
import { TbEye, TbEyeOff } from "react-icons/tb";

function AdminManageReviewer() {
  const [modal, setModal] = useState({ add: false });
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    editable: false,
  });
  const [validate, setValidate] = useState({
    email: false,
    phone: false,
    password: false,
  });
  const [passVisible, setPassVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { reviewer_item, loading } = useSelector((state) => state.reviewer);
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      listReviewerItem({
        end_point: `/api/account/list_rev`,
        // end_point: `/api/account/list_admin`,
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch]);

  const handleAddModal = () => {
    setModal({ ...modal, add: true });
    setData({
      ...data,
      name: "",
      email: "",
      phone: "",
      password: "",
      editable: false,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (mailPattern.test(value)) {
        setValidate({ ...validate, email: true });
      } else {
        setValidate({ ...validate, email: false });
      }
    } else if (name === "phone") {
      if (phoneNumber.test(value)) {
        setValidate({ ...validate, phone: true });
      } else {
        setValidate({ ...validate, phone: false });
      }
    } else if (name === "password") {
      if (strongPwd.test(value)) {
        setValidate({ ...validate, password: true });
      } else {
        setValidate({ ...validate, password: false });
      }
    }
    setData({ ...data, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate.email) {
      alert("Please enter a valid email address.");
    } else if (!validate.phone) {
      alert("Please enter a valid phone number.");
    } else if (!validate.password) {
      alert(
        "Password must have atleast 1 lowercase, number, special characters and minimum 8 characters."
      );
    } else {
      const result = await dispatch(
        postReviewerItem({
          end_point: `/api/account/create_acc`,
          //   end_point: `/api/account/create_acc?role=1`,
          access_token: access_token,
          item_data: {
            name: data.name,
            phone: "+91" + data.phone,
            email: data.email,
            password: data.password,
          },
        })
      ).unwrap();
      if (result.responseCode === 200) {
        toast.success("Reviewer added successfully!");
        setModal({ ...modal, add: false });
        dispatch(
          listReviewerItem({
            end_point: `/api/account/list_rev`,
            // end_point: `/api/account/list_admin`,
            access_token: access_token,
          })
        ).unwrap();
      } else {
        toast.error(
          result.responseMessage || "Connection failed. Please try again."
        );
      }
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">Manage Reviewers</p>

          <Button
            onClick={handleAddModal}
            className="shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
          >
            Create Reviewer
          </Button>
        </div>

        {!loading ? (
          <>
            {reviewer_item?.length > 0 ? (
              <div>
                <Card className="h-fit w-full box-shadow mt-5">
                  <CardBody className="overflow-auto px-0 py-0">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {[
                            "Reviewer Name",
                            "Phone Number",
                            "Email",
                            "Password",
                            "Created by",
                          ].map((head) => (
                            <th key={head} className=" bg-[#e9e6e6] p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold leading-none opacity-70 font-ddin"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {reviewer_item?.map((reviewer, index) => {
                          const isLast = index === reviewer_item?.length - 1;
                          const classes = isLast
                            ? "p-4 font-ddin"
                            : "p-4 border-b border-blue-gray-50 font-ddin";

                          return (
                            <tr key={index} className="hover:bg-[#f0eeee]">
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold font-ddin text-base"
                                >
                                  {reviewer.name}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal font-ddin"
                                >
                                  {reviewer.phone}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal font-ddin"
                                >
                                  {reviewer.email}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal font-ddin flex items-center gap-2"
                                >
                                  {showPassword
                                    ? reviewer.password
                                    : "*".repeat(reviewer.password.length)}{" "}
                                  {!showPassword ? (
                                    <TbEyeOff
                                      onClick={togglePasswordVisibility}
                                      className="cursor-pointer"
                                    />
                                  ) : (
                                    <TbEye
                                      onClick={togglePasswordVisibility}
                                      className="cursor-pointer"
                                    />
                                  )}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal font-ddin"
                                >
                                  {reviewer?.createdBy?.name || "-"}
                                </Typography>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </div>
            ) : (
              <div className="h-[50vh] flex justify-center items-center flex-col">
                <p className="text-3xl font-ddin font-semibold text-center">
                  No result found
                </p>
                <p className="font-myriad font-light text-center text-gray-700">
                  Add some items to cheer it up
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="h-[50vh] flex justify-center items-center flex-col">
            <p className="text-3xl font-ddin font-semibold text-center">
              Loading...
            </p>
          </div>
        )}
      </div>

      <ManageModalReviewer
        open={modal.add}
        close={() => setModal({ ...modal, add: false })}
        data={data}
        handleChange={handleChange}
        handlePasswordVisibility={handlePasswordVisibility}
        passVisible={passVisible}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
}

export default AdminManageReviewer;
