import {
  Card,
  CardBody,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REVIEWER_STUDENTLIST_TABLE_HEAD } from "../../utils/constants";
import { listReviewerItem } from "../../redux/reviewerSlice";
import { useNavigate } from "react-router-dom";
import { fetchBatchItems } from "../../redux/batchSlice";
import * as XLSX from "xlsx";

function ReviewerStudentList() {
  const [active, setActive] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedBatchState, setSelectedBatchState] = useState("");
  const [selectedCurrentstate, setSelectedCurrentState] = useState("");
  const { reviewer_item, loading } = useSelector((state) => state.reviewer);
  const { batch_items } = useSelector((state) => state.batch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_reviewer_access_token");

  const getReviewerStatus = (state) => {
    switch (state) {
      case 0:
        return "Not Started";
      case 1:
        return "In Progress";
      case 2:
        return "Accepted";
      case 3:
        return "Follow Up";
      case 4:
        return "Rejected";
      case 5:
        return "Unable to Decide";
      case 6:
        return "Exam Scheduled";
      case 7:
        return "Exam Passed";
      case 8:
        return "Assigned";
      default:
        return "-";
    }
  };

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: "/api/batch/list",
        access_token: access_token,
      })
    );
  }, [dispatch, access_token]);

  useEffect(() => {
    const query = new URLSearchParams();

    if (selectedBatch) query.append("batch_id", selectedBatch);
    if (selectedBatchState) query.append("batch_state", selectedBatchState);
    if (selectedCurrentstate)
      query.append("current_state", selectedCurrentstate);

    dispatch(
      listReviewerItem({
        end_point: `/api/account/list_rev?${query.toString()}`,
        access_token: access_token,
      })
    );
  }, [selectedBatch, selectedBatchState, selectedCurrentstate, dispatch]);

  const getBatchStatus = (state) => {
    switch (state) {
      case 1:
        return "Not Assigned";
      case 2:
        return "Assigned";
      default:
        return "-";
    }
  };

  const exportToExcel = () => {
    const students = reviewer_item[0]?.studentInfo || [];

    if (students.length === 0) {
      alert("No student data to export.");
      return;
    }

    const formattedData = students.map((student) => ({
      Name: student?.name || "",
      Email: student?.email || "",
      Phone: student?.phone || "",
      Education: student?.education || "",
      "Year Passed": student?.year_passed || "",
      Reviewer: student?.reviewerInfo?.name || "N/A",
      Batch: student?.batchInfo?.name || "N/A",
      Reviewer_Status: getReviewerStatus(student?.current_state),
      Batch_Status: getBatchStatus(student?.batch_state),
      Comment: student?.comment || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "Reviewer_Student_List.xlsx");
  };

  const handleRowClick = (student_data) => {
    navigate("/reviewer/student/profile", { state: { student: student_data } });
  };

  const handleStudentSearch = async (e) => {
    const searchQuery = e.target.value.trim();

    if (searchQuery?.length > 0) {
      dispatch(
        listReviewerItem({
          end_point: `/api/account/list_rev?searchkey=${searchQuery}`,
          access_token: access_token,
        })
      );
    } else {
      dispatch(
        listReviewerItem({
          end_point: `/api/account/list_rev`,
          access_token: access_token,
        })
      );
    }
  };

  const clearFilters = () => {
    setSelectedBatch("");
    setSelectedBatchState("");
    setSelectedCurrentState("");
    setActive(1);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div className="font-ddin font-semibold text-lg">
          Manage status & reviewer
        </div>

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
      <div className="flex justify-between items-center font-ddin">
        <div className="flex flex-wrap gap-4 my-4">
          {/* Batch State */}
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Batch State
            </label>
            <select
              value={selectedBatchState}
              onChange={(e) => {
                setSelectedBatchState(e.target.value);
                setActive(1);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All States</option>
              <option value="1">Not Assigned</option>
              <option value="2">Assigned</option>
            </select>
          </div>

          {/* Batch */}
          {selectedBatchState === "2" && (
            <div className="w-48">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Batch
              </label>
              <select
                value={selectedBatch}
                key={batch_items.length}
                onChange={(e) => {
                  setSelectedBatch(e.target.value);
                  setActive(1);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Batches</option>
                {batch_items.map((batch) => (
                  <option key={batch.batch_id} value={batch.batch_id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status */}
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-ddin"
              value={selectedCurrentstate}
              onChange={(e) => {
                setSelectedCurrentState(e.target.value);
                setActive(1);
              }}
            >
              <option value="">All States</option>
              <option value="0">Not Started</option>
              <option value="1">In Progress</option>
              <option value="2">Accepted</option>
              <option value="3">Follow Up</option>
              <option value="4">Rejected</option>
              <option value="5">Unable to Decide</option>
              <option value="6">Exam Scheduled</option>
              <option value="7">Exam Passed</option>
              <option value="8">Assigned</option>
            </select>
          </div>
          <div className="w-48 self-end">
            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium border border-gray-300 transition"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div>
          <Button
            className="py-2 shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
            onClick={exportToExcel}
          >
            Export
          </Button>
        </div>
      </div>
      {!loading ? (
        <>
          {reviewer_item[0]?.studentInfo?.length > 0 ? (
            <div>
              <Card className="h-fit w-full box-shadow mt-5">
                <CardBody className="overflow-auto px-0 py-0">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {REVIEWER_STUDENTLIST_TABLE_HEAD.map((head) => (
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
                      {reviewer_item[0]?.studentInfo?.map((student, index) => {
                        const isLast =
                          index === reviewer_item?.studentInfo?.length - 1;
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
                                <span
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
                                ></span>
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
                                <span
                                  className={`rounded-full w-2 h-2 ${
                                    student.batch_state === 1
                                      ? "bg-[#FF0000]"
                                      : student.batch_state === 2
                                      ? "bg-[#008000]"
                                      : "bg-black"
                                  }`}
                                ></span>
                                {student.batch_state === 1
                                  ? "Not Assigned"
                                  : student.batch_state === 2
                                  ? "Assigned"
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

              {/* {profile_data?.studentData?.length > 0 && (
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
          )} */}
            </div>
          ) : (
            <div className="h-[50vh] flex justify-center items-center flex-col">
              <div className="text-3xl font-ddin font-semibold text-center">
                No result found
              </div>
              <div className="font-myriad font-light text-center text-gray-700">
                Add some items to cheer it up
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="h-[50vh] flex justify-center items-center flex-col">
          <div className="text-3xl font-ddin font-semibold text-center">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewerStudentList;
