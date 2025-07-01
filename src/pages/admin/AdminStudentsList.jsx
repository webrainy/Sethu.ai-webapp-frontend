import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
  Input,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { ADMIN_STUDENTLIST_TABLE_HEAD } from "../../utils/constants";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/studentSlice";
import { LuFilter } from "react-icons/lu";
import * as XLSX from "xlsx";

function AdminStudentsList() {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile_data, loading } = useSelector((state) => state.student);
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      fetchStudentProfile({
        end_point: `/api/student/list?page=${active}&limit=${10}`,
        access_token: access_token,
      })
    );
  }, [dispatch, active]);

  const handleRowClick = (student_data) => {
    navigate("/admin/student/profile", { state: { student: student_data } });
  };

  const handleStudentSearch = async (e) => {
    const searchQuery = e.target.value.trim();

    if (searchQuery?.length > 0) {
      dispatch(
        fetchStudentProfile({
          end_point: `/api/student/list?page=${1}&limit=${10}&searchkey=${searchQuery}`,
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

  const handleExport = () => {
    // Prepare data for export
    const exportData = profile_data?.studentData?.map((student) => ({
      Name: student.name,
      Email: student.email,
      Education: student.education,
      Phone: student.phone,
      "Year Passed": student.year_passed,
      Status:
        student.current_state === 0
          ? "Not started"
          : student.current_state === 1
          ? "In Progress"
          : student.current_state === 2
          ? "Accepted"
          : student.current_state === 3
          ? "Follow-up"
          : student.current_state === 4
          ? "Rejected"
          : student.current_state === 5
          ? "Unable to decide"
          : "-",
      "Batch Status":
        student.batch_state === 1
          ? "Not Assigned"
          : student.batch_state === 2
          ? "Assigned"
          : "-",
      Reviewer: student?.reviewerInfo?.name || "-",
      "Assigned By": student?.assignedBy?.name || "-",
    }));

    if (exportData && exportData.length > 0) {
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Students");

      // Generate file name with current date
      const fileName = `Students_Export_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;

      // Export the workbook
      XLSX.writeFile(wb, fileName);
    } else {
      alert("No data to export");
    }
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
      <div className="flex justify-end items-center mt-5 gap-4">
        <Tooltip content="Filter">
          <IconButton
            variant="outlined"
            className="border border-gray-300 p-2 rounded-md hover:bg-gray-100"
          >
            <LuFilter className="h-5 w-5 text-gray-700" />
          </IconButton>
        </Tooltip>

        <Button
          onClick={handleExport}
          className="px-4 py-2 shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border border-[#DD4633] bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633] rounded-md"
        >
          Export
        </Button>
      </div>

      {!loading ? (
        <>
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
                                className={`font-normal font-ddin flex items-center gap-2 ${
                                  student.current_state === 0
                                    ? "text-gray-600"
                                    : student.current_state === 1
                                    ? "text-blue-500"
                                    : student.current_state === 2
                                    ? "text-green-500"
                                    : student.current_state === 3
                                    ? "text-orange-500"
                                    : student.current_state === 4
                                    ? "text-red-500"
                                    : student.current_state === 5
                                    ? "text-purple-500"
                                    : "text-black"
                                }`}
                              >
                                <div
                                  className={`rounded-full w-2 h-2 ${
                                    student.current_state === 0
                                      ? "bg-gray-600"
                                      : student.current_state === 1
                                      ? "bg-blue-500"
                                      : student.current_state === 2
                                      ? "bg-green-500"
                                      : student.current_state === 3
                                      ? "bg-orange-500"
                                      : student.current_state === 4
                                      ? "bg-red-500"
                                      : student.current_state === 5
                                      ? "bg-purple-500"
                                      : "bg-black"
                                  }`}
                                ></div>
                                {student.current_state === 0
                                  ? "Not started"
                                  : student.current_state === 1
                                  ? "In Progress"
                                  : student.current_state === 2
                                  ? "Accepted"
                                  : student.current_state === 3
                                  ? "Follow-up"
                                  : student.current_state === 4
                                  ? "Rejected"
                                  : student.current_state === 5
                                  ? "Unable to decide"
                                  : "-"}
                              </Typography>
                            </td>

                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className={`font-normal font-ddin flex items-center gap-2 ${
                                  student.batch_state === 1
                                    ? "text-[#FF0000]"
                                    : student.batch_state === 2
                                    ? "text-[#008000]"
                                    : "text-black"
                                }`}
                              >
                                <div
                                  className={`rounded-full w-2 h-2 ${
                                    student.batch_state === 1
                                      ? "bg-[#FF0000]"
                                      : student.batch_state === 2
                                      ? "bg-[#008000]"
                                      : "bg-black"
                                  }`}
                                ></div>
                                {student.batch_state === 1
                                  ? "Not Assigned"
                                  : student.batch_state === 2
                                  ? "Assigned"
                                  : "-"}
                              </Typography>
                            </td>

                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal font-ddin"
                              >
                                {student?.reviewerInfo
                                  ? student?.reviewerInfo?.name
                                  : "-"}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal font-ddin"
                              >
                                {student?.assignedBy?.name || "-"}
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
        </>
      ) : (
        <div className="h-[50vh] flex justify-center items-center flex-col">
          <p className="text-3xl font-ddin font-semibold text-center">
            Loading...
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminStudentsList;
