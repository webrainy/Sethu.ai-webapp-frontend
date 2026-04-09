import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../utils/constants";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function AdminBatchExams() {
  const location = useLocation().state;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const batch_id = location?.batch_id;
  const batchName = location?.batchName;

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  useEffect(() => {
    if (batch_id) fetchExams(active);
  }, [batch_id, active]);

  const fetchExams = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${base_url}/api/exam/list?batch_id=${batch_id}&page=${page}&limit=${limit}`,
        { headers: { Authorization: access_token } },
      );
      const data = await res.json();
      if (data.responseCode === 200) {
        setExams(data.responseData?.exams || []);
        setTotalPages(data.responseData?.totalPages || 1);
        setTotalCount(data.responseData?.totalCount || 0);
      } else {
        toast.error("Failed to load exams.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-[#f7f7f7]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-3xl font-ddin font-bold text-blue-gray-900">
            Manage Exams
          </p>
          <p className="font-myriad font-light text-gray-500 mt-1">
            Batch:{" "}
            <span className="font-ddin font-semibold text-[#FF9D23]">
              {batchName}
            </span>
            {totalCount > 0 && (
              <span className="ml-2 text-xs font-ddin text-gray-400">
                ({totalCount} exams)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm font-ddin text-gray-400 hover:text-[#DD4633] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <Button
            onClick={() =>
              navigate("/admin/batch/exam/create", {
                state: { batch_id, batchName },
              })
            }
            className="normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-2 px-5 bg-[#DD4633]"
          >
            + Create Exam
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-[40vh]">
          <p className="text-2xl font-ddin font-semibold text-gray-400">
            Loading...
          </p>
        </div>
      )}

      {/* Exam List */}
      {!loading && exams.length > 0 ? (
        <>
          <Card className="h-full w-full shadow-sm">
            <CardBody className="overflow-auto px-0 py-0">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-[#e9e6e6]">
                    {["Sl No", "Exam Title", "Date", "Action"].map((h, i) => (
                      <th
                        key={i}
                        className={`p-4 ${i >= 3 ? "text-center" : ""}`}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold leading-none opacity-70 font-ddin"
                        >
                          {h}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam, index) => {
                    const isLast = index === exams.length - 1;
                    const tdClass = isLast
                      ? "px-4 py-4 font-ddin"
                      : "px-4 py-4 border-b border-blue-gray-50 font-ddin";
                    const marksCount = exam.results?.length || 0;

                    return (
                      <tr key={exam.exam_id} className="hover:bg-[#f0eeee]">
                        <td className={tdClass}>
                          <Typography
                            variant="small"
                            className="font-ddin text-gray-500"
                          >
                            {(active - 1) * limit + index + 1}
                          </Typography>
                        </td>
                        <td className={tdClass}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold font-ddin"
                          >
                            {exam.title}
                          </Typography>
                        </td>
                        <td className={tdClass}>
                          <Typography
                            variant="small"
                            className="font-ddin text-gray-500"
                          >
                            {exam.exam_datetime
                              ? new Date(exam.exam_datetime).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "—"}
                          </Typography>
                        </td>

                        <td className={`${tdClass} text-center`}>
                          <button
                            onClick={() =>
                              navigate("/admin/batch/exam/details", {
                                state: { exam, batch_id, batchName },
                              })
                            }
                            className="text-sm font-ddin font-semibold text-[#DD4633] hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-6 justify-center mt-4">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={() => setActive((p) => Math.max(p - 1, 1))}
                disabled={active === 1}
              >
                <HiArrowLeft className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-myriad font-light">
                Page <strong className="text-gray-900">{active}</strong> of{" "}
                <strong className="text-gray-900">{totalPages}</strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={() => setActive((p) => Math.min(p + 1, totalPages))}
                disabled={active === totalPages}
              >
                <HiArrowRight className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-xl font-ddin font-semibold text-gray-400">
              No exams found
            </p>
            <p className="text-sm font-myriad text-gray-400 mt-1">
              Click "Create Exam" to add one
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default AdminBatchExams;
