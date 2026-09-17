import React, { useEffect, useState } from "react";
import { base_url } from "../../utils/constants";
import toast from "react-hot-toast";
import {
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function StudentExams() {
  const access_token = localStorage.getItem("sethu_student_access_token");

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  // Modal
  const [viewModal, setViewModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    fetchExams(activePage);
  }, [activePage]);

  const fetchExams = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${base_url}/api/exam/list?page=${page}&limit=${limit}`,
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

  const handleView = (exam) => {
    setSelectedExam(exam);
    setViewModal(true);
  };

  return (
    <div className="p-3">
      {/* Header */}
      <div className="mb-5">
        <p className="text-3xl font-ddin font-semibold">My Exams</p>
        <p className="font-myriad font-light text-gray-500 mt-1">
          View your exam results and marks
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="h-[50vh] flex justify-center items-center">
          <p className="text-3xl font-ddin font-semibold text-center">
            Loading...
          </p>
        </div>
      )}

      {/* Exams */}
      {!loading && exams.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {exams.map((exam) => {
              const result = exam.result;
              const hasMarks = exam.hasMarks;

              return (
                <div
                  key={exam.exam_id}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                    hasMarks
                      ? "border-l-4 border-l-green-400 border-gray-200"
                      : "border-l-4 border-l-orange-300 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between px-5 py-4 gap-4">
                    {/* Exam Info */}
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-ddin font-bold text-blue-gray-900">
                        {exam.title}
                      </p>
                      {exam.exam_datetime && (
                        <p className="text-sm font-myriad text-gray-400">
                          {new Date(exam.exam_datetime).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </p>
                      )}
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-end gap-2">
                      {hasMarks && result ? (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-ddin font-semibold px-3 py-1 rounded-full border text-green-700 bg-green-50 border-green-200">
                              Result Published
                            </span>
                            <button
                              onClick={() => handleView(exam)}
                              className="text-xs font-ddin font-semibold text-[#DD4633] hover:underline"
                            >
                              View
                            </button>
                          </div>
                        </>
                      ) : (
                        <span className="text-xs font-ddin font-semibold px-3 py-1 rounded-full border text-orange-600 bg-orange-50 border-orange-200">
                          Result Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-6 justify-center mt-4">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
                disabled={activePage === 1}
              >
                <HiArrowLeft className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-myriad font-light">
                Page <strong className="text-gray-900">{activePage}</strong> of{" "}
                <strong className="text-gray-900">{totalPages}</strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={() =>
                  setActivePage((p) => Math.min(p + 1, totalPages))
                }
                disabled={activePage === totalPages}
              >
                <HiArrowRight className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </>
      ) : (
        !loading && (
          <div className="h-[50vh] flex justify-center items-center flex-col">
            <p className="text-3xl font-ddin font-semibold text-center">
              No exams found
            </p>
            <p className="font-myriad font-light text-center text-gray-700">
              Your exam results will appear here
            </p>
          </div>
        )
      )}

      {/* View Modal */}
      <Dialog open={viewModal} handler={() => setViewModal(false)} size="sm">
        <DialogHeader className="flex flex-col items-start gap-1">
          <p className="text-lg font-ddin font-bold text-blue-gray-900">
            {selectedExam?.title}
          </p>
          {selectedExam?.exam_datetime && (
            <p className="text-sm font-myriad font-light text-gray-400">
              {new Date(selectedExam.exam_datetime).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              )}
            </p>
          )}
        </DialogHeader>
        <DialogBody>
          {selectedExam?.result ? (
            <div className="flex flex-col gap-4">
              {/* Marks */}
              <div className="flex justify-center items-center py-6 bg-green-50 rounded-xl border border-green-100">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs font-ddin text-gray-400 uppercase tracking-wider font-semibold">
                    Your Score
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-ddin font-bold text-green-600">
                      {selectedExam.result.marks}
                    </span>
                    <span className="text-2xl font-ddin text-gray-400">
                      / {selectedExam.result.total_marks}
                    </span>
                  </div>
                  {/* Percentage */}
                  <span className="text-sm font-ddin text-green-600 font-semibold mt-1">
                    {Math.round(
                      (Number(selectedExam.result.marks) /
                        Number(selectedExam.result.total_marks)) *
                        100,
                    )}
                    %
                  </span>
                </div>
              </div>

              {/* Comments */}
              {selectedExam.result.comments && (
                <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3">
                  <p className="text-xs font-ddin text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Instructor Comments
                  </p>
                  <p className="text-sm font-myriad text-gray-700">
                    {selectedExam.result.comments}
                  </p>
                </div>
              )}

              {/* Status */}
              <div className="flex justify-center">
                <span className="text-xs font-ddin font-semibold px-4 py-1.5 rounded-full border text-green-700 bg-green-50 border-green-200">
                  ✓ Result Published
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <span className="text-xs font-ddin font-semibold px-4 py-1.5 rounded-full border text-orange-600 bg-orange-50 border-orange-200">
                Result Pending
              </span>
              <p className="text-sm font-myriad text-gray-400 text-center">
                Your result has not been published yet.
              </p>
            </div>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default StudentExams;
//latest