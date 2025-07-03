import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
  Input,
  Option,
  Select,
  Button,
} from "@material-tailwind/react";
import { ADMIN_STUDENTLIST_TABLE_HEAD } from "../../utils/constants";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/studentSlice";
import { fetchBatchItems } from "../../redux/batchSlice";
import { listReviewerItem } from "../../redux/reviewerSlice";
import * as XLSX from "xlsx";

function AdminStudentsList() {
  const [active, setActive] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedBatchState, setSelectedBatchState] = useState("");
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [selectedReviewerState, setSelectedReviewerState] = useState("");
  const [selectedExamState, setSelectedExamState] = useState("");
  const [selectedCurrentstate, setSelectedCurrentState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile_data, loading } = useSelector((state) => state.student);
  const { batch_items } = useSelector((state) => state.batch);
  const { reviewer_item } = useSelector((state) => state.reviewer);
  const access_token = localStorage.getItem("sethu_admin_access_token");
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

  const exportToExcel = () => {
    const students = profile_data?.studentData || [];

    if (students.length === 0) {
      alert("No student data to export.");
      return;
    }

    const formattedData = students.map((student) => ({
      Name: student?.name,
      Email: student?.email,
      Phone: student?.phone,
      Reviewer: student?.reviewerInfo?.name || "N/A",
      Batch: student?.batchInfo?.batch_name || "N/A",
      Reviewer_Status: getReviewerStatus(student?.current_state),
      Comment: student?.comment || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "student_data.xlsx");
  };

  useEffect(() => {
    const fetchStudents = () => {
      let queryParams = `page=${active}&limit=10`;
      if (searchQuery) {
        queryParams += `&searchkey=${encodeURIComponent(searchQuery)}`;
      }

      if (selectedBatch) {
        queryParams += `&batch_id=${selectedBatch}`;
      }

      if (selectedBatchState) {
        queryParams += `&batch_state=${selectedBatchState}`;
      }

      if (selectedReviewerState) {
        queryParams += `&reviewer_state=${selectedReviewerState}`;
      }

      if (selectedReviewer) {
        queryParams += `&account_id=${selectedReviewer}`;
      }

      if (selectedCurrentstate !== "") {
        queryParams += `&current_state=${Number(selectedCurrentstate)}`;
      }

      if (selectedExamState) {
        queryParams += `&exam_state=${selectedExamState}`;
      }

      dispatch(
        fetchStudentProfile({
          end_point: `/api/student/list?${queryParams}`,
          access_token: access_token,
        })
      );
    };

    fetchStudents();
  }, [
    dispatch,
    active,
    searchQuery,
    selectedBatch,
    selectedBatchState,
    selectedReviewer,
    selectedReviewerState,
    selectedExamState,
    selectedCurrentstate,
    access_token,
  ]);

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: "/api/batch/list",
        access_token: access_token,
      })
    );

    dispatch(
      listReviewerItem({
        end_point: "/api/account/list_rev",
        access_token: access_token,
      })
    );
  }, [dispatch, access_token]);

  const handleRowClick = (student_data) => {
    navigate("/admin/student/profile", { state: { student: student_data } });
  };

  const handleStudentSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    setActive(1);
  };

  const next = () => {
    if (active === profile_data?.totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const clearFilters = () => {
    setSelectedBatch("");
    setSelectedBatchState("");
    setSelectedReviewer("");
    setSelectedReviewerState("");
    setSelectedExamState("");
    setSearchQuery("");
    setSelectedCurrentState("");
    setActive(1);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <Typography as="h1" className="text-3xl font-ddin font-semibold">
          Manage Student
        </Typography>

        <div className="w-72">
          <Input
            type="text"
            accessKey="s"
            label="Type Alt+S to search"
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            containerProps={{ className: "font-ddin" }}
            onChange={handleStudentSearch}
            value={searchQuery}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-4 my-6 font-ddin">
          {/* Batch State */}
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Batch State
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-ddin"
              value={selectedBatchState}
              onChange={(e) => {
                setSelectedBatchState(e.target.value);
                setActive(1);
              }}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-ddin"
                value={selectedBatch}
                key={batch_items.length}
                onChange={(e) => {
                  setSelectedBatch(e.target.value);
                  setActive(1);
                }}
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

          {/* Reviewer State */}
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Reviewer State
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-ddin"
              value={selectedReviewerState}
              onChange={(e) => {
                setSelectedReviewerState(e.target.value);
                setActive(1);
              }}
            >
              <option value="">All States</option>
              <option value="1">Not Assigned</option>
              <option value="2">Assigned</option>
            </select>
          </div>

          {/* Reviewer */}
          {selectedReviewerState === "2" && (
            <div className="w-48">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Reviewer
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-ddin"
                value={selectedReviewer}
                onChange={(e) => {
                  setSelectedReviewer(e.target.value);
                  setActive(1);
                }}
              >
                <option value="">All Reviewer</option>
                {reviewer_item?.map((reviewer) => (
                  <option key={reviewer.account_id} value={reviewer.account_id}>
                    {reviewer.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* State */}
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select State
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
        profile_data?.studentData?.length > 0 ? (
          <>
            <Card className="h-fit w-full box-shadow mt-5">
              <CardBody className="overflow-auto px-0 py-0">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {ADMIN_STUDENTLIST_TABLE_HEAD.map((head) => (
                        <th key={head} className=" bg-[#e9e6e6] p-4">
                          <Typography
                            as="div"
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
                    {profile_data.studentData.map((student, index) => {
                      const isLast =
                        index === profile_data.studentData.length - 1;
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
                                  as="div"
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold font-ddin hover:underline text-base"
                                >
                                  {student.name}
                                </Typography>
                                <Typography
                                  as="div"
                                  variant="small"
                                  className="font-normal text-blue-gray-400 font-ddin"
                                >
                                  {student.email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography as="div" variant="small">
                              {student.education}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography as="div" variant="small">
                              {student.phone}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography as="div" variant="small">
                              {student.year_passed}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="div"
                              variant="small"
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
                                  : student.current_state === 6
                                  ? "text-orange-600"
                                  : student.current_state === 7
                                  ? "text-green-700"
                                  : student.current_state === 8
                                  ? "text-indigo-500"
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
                                    : student.current_state === 6
                                    ? "bg-orange-600"
                                    : student.current_state === 7
                                    ? "bg-green-700"
                                    : student.current_state === 8
                                    ? "bg-indigo-500"
                                    : "bg-black"
                                }`}
                              ></div>
                              {student.current_state === 0
                                ? "Not Started"
                                : student.current_state === 1
                                ? "In Progress"
                                : student.current_state === 2
                                ? "Accepted"
                                : student.current_state === 3
                                ? "Follow Up"
                                : student.current_state === 4
                                ? "Rejected"
                                : student.current_state === 5
                                ? "Unable to Decide"
                                : student.current_state === 6
                                ? "Exam Scheduled"
                                : student.current_state === 7
                                ? "Exam Passed"
                                : student.current_state === 8
                                ? "Assigned"
                                : "-"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography as="div" variant="small">
                              {student.batch_state === 1
                                ? "Not Assigned"
                                : student.batch_state === 2
                                ? "Assigned"
                                : "-"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography as="div" variant="small">
                              {student.reviewerInfo?.name || "-"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography as="div" variant="small">
                              {student.assignedBy?.name || "-"}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>

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
                as="div"
                color="gray"
                className="!block font-myriad font-light"
              >
                Page <strong className="text-gray-900">{active}</strong> of{" "}
                <strong className="text-gray-900">
                  {profile_data.totalPages}
                </strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={active === profile_data.totalPages}
              >
                <HiArrowRight className="h-4 w-4" />
              </IconButton>
            </div>
          </>
        ) : (
          <div className="h-[50vh] flex justify-center items-center flex-col">
            <Typography
              as="h2"
              className="text-3xl font-ddin font-semibold text-center"
            >
              No result found
            </Typography>
            <Typography
              as="p"
              className="font-myriad font-light text-center text-gray-700"
            >
              Add some items to cheer it up
            </Typography>
          </div>
        )
      ) : (
        <div className="h-[50vh] flex justify-center items-center flex-col">
          <Typography
            as="h2"
            className="text-3xl font-ddin font-semibold text-center"
          >
            Loading...
          </Typography>
        </div>
      )}
    </div>
  );
}

export default AdminStudentsList;
