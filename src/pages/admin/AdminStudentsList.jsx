import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { ADMIN_STUDENTLIST_TABLE_HEAD } from "../../utils/constants";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/studentSlice";

function AdminStudentsList() {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile_data } = useSelector((state) => state.student);
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      fetchStudentProfile({
        end_point: `/api/student/list?page=${active}&limit=${10}`,
        access_token: access_token,
      })
    );
  }, [dispatch, active]);

  console.log(profile_data);

  const handleRowClick = (student_data) => {
    navigate("/admin/student/profile", { state: { student: student_data } });
  };

  const handleStudentSearch = async (e) => {
    const searchQuery = e.target.value.trim();

    if (searchQuery?.length > 0) {
      dispatch(
        fetchStudentProfile({
          end_point: `/api/student/list?searchkey=${searchQuery}`,
          access_token: access_token,
        })
      );
    } else {
      dispatch(
        fetchStudentProfile({
          end_point: `/api/student/list?page=${active}&limit=${10}`,
          access_token: access_token,
        })
      );
    }
  };

  const next = () => {
    if (active === profile_data?.totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">Manage Student</p>

        <div className="w-72">
          <Input
            type="text"
            accessKey="s"
            label="Type Alt+S to search"
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            containerProps={{
              className: "font-ddin",
            }}
            onChange={handleStudentSearch}
          />
        </div>
      </div>

      {/* {!loading ? (
        <> */}
      {profile_data?.studentData?.length > 0 ? (
        <div>
          <Card className="h-fit w-full box-shadow mt-5">
            <CardBody className="overflow-auto px-0 py-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {ADMIN_STUDENTLIST_TABLE_HEAD.map((head) => (
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
                  {profile_data?.studentData?.map((student, index) => {
                    const isLast =
                      index === profile_data?.studentData?.length - 1;
                    const classes = isLast
                      ? "p-4 font-ddin"
                      : "p-4 border-b border-blue-gray-50 font-ddin";

                    return (
                      <tr key={index} className="hover:bg-[#f0eeee]">
                        <td className={classes}>
                          <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => handleRowClick(student)}
                          >
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold font-ddin hover:underline text-base"
                              >
                                {student.name}
                              </Typography>
                              <Typography
                                variant="small"
                                className="font-normal text-blue-gray-400 font-ddin"
                              >
                                {student.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-ddin"
                          >
                            {student.education}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-ddin"
                          >
                            {student.phone}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-ddin"
                          >
                            {student.year_passed}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className={`font-normal font-ddin  ${
                              student.current_state === 1
                                ? "text-yellow-500" // Pending - Yellow
                                : student.current_state === 2
                                ? "text-blue-500" // Batch Assigned - Blue
                                : student.current_state === 3
                                ? "text-green-500" // Accepted - Green
                                : student.current_state === 4
                                ? "text-red-500" // Rejected - Red
                                : student.current_state === 5
                                ? "text-gray-800" // Unable to Decide - Gray
                                : "text-black" // Default - Light Gray
                            }`}
                          >
                            {student.current_state === 1
                              ? "Pending"
                              : student.current_state === 2
                              ? "Batch assigned"
                              : student.current_state === 3
                              ? "Accepted"
                              : student.current_state === 4
                              ? "Rejected"
                              : student.current_state === 5
                              ? "Unable to decide"
                              : "-"}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>

          {profile_data?.studentData?.length > 0 && (
            <div className="flex items-center gap-6 justify-center mt-4">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={active === 1}
              >
                <HiArrowLeft className="h-4 w-4" />
              </IconButton>
              <Typography
                color="gray"
                className="!block font-myriad font-light"
              >
                Page <strong className="text-gray-900">{active}</strong> of{" "}
                <strong className="text-gray-900">
                  {profile_data?.totalPages}
                </strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={active === profile_data?.totalPages}
              >
                <HiArrowRight className="h-4 w-4" />
              </IconButton>
            </div>
          )}
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
      {/* </>
      ) : (
        <div className="h-[50vh] flex justify-center items-center flex-col">
          <p className="text-3xl font-ddin font-semibold text-center">
            Loading...
          </p>
        </div>
      )} */}
    </div>
  );
}

export default AdminStudentsList;
