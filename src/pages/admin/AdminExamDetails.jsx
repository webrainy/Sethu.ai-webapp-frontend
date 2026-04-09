import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../utils/constants";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function AdminExamDetails() {
  const location = useLocation().state;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const batch_id = location?.batch_id;
  const batchName = location?.batchName;
  const examPassed = location?.exam;

  const [exam, setExam] = useState(examPassed || null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Student pagination
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  // Marks modal
  const [marksModal, setMarksModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marksData, setMarksData] = useState({
    marks: "",
    total_marks: "",
    comments: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (batch_id) fetchStudents(activePage);
    if (exam?.exam_id) fetchExam();
  }, []);

  useEffect(() => {
    if (batch_id) fetchStudents(activePage);
  }, [activePage]);

  const fetchExam = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${base_url}/api/exam/list?batch_id=${batch_id}&page=1&limit=999`,
        { headers: { Authorization: access_token } },
      );
      const data = await res.json();
      if (data.responseCode === 200) {
        const found = data.responseData?.exams?.find(
          (e) => e.exam_id === exam.exam_id,
        );
        if (found) setExam(found);
      }
    } catch (err) {
      console.log("Fetch exam error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (page) => {
    try {
      const res = await fetch(
        `${base_url}/api/student/list?page=${page}&limit=${limit}&batch_id=${batch_id}`,
        { headers: { Authorization: access_token } },
      );
      const data = await res.json();
      if (data.responseCode === 200) {
        setStudents(data.responseData?.studentData || []);
        setTotalPages(data.responseData?.totalPages || 1);
        setTotalCount(data.responseData?.totalCount || 0);
      }
    } catch (err) {
      console.log("Fetch students error:", err);
    }
  };

  const handleOpenMarksModal = (student) => {
    setSelectedStudent(student);
    const existingResult = exam?.results?.find(
      (r) => r.student_id === student.student_id,
    );
    setMarksData({
      marks: existingResult?.marks || "",
      total_marks: existingResult?.total_marks || "",
      comments: existingResult?.comments || "",
    });
    setMarksModal(true);
  };

  const handleSubmitMarks = async () => {
    if (!marksData.marks) {
      toast.error("Please enter marks.");
      return;
    }
    if (!marksData.total_marks) {
      toast.error("Please enter total marks.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${base_url}/api/exam/result/create`, {
        method: "POST",
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exam_id: exam.exam_id,
          student_id: selectedStudent.student_id,
          marks: marksData.marks,
          total_marks: marksData.total_marks,
          comments: marksData.comments,
        }),
      });
      const data = await res.json();
      if (data.responseCode === 200) {
        toast.success("Marks saved!");
        setMarksModal(false);
        fetchExam();
      } else {
        toast.error(data.responseMessage || "Failed to save marks.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const marksAddedCount = exam?.results?.length || 0;

  return (
    <div className="p-4 min-h-screen bg-[#f7f7f7]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-3xl font-ddin font-bold text-blue-gray-900">
            {exam?.title || "Exam Details"}
          </p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <p className="font-myriad font-light text-gray-500">
              Batch:{" "}
              <span className="font-ddin font-semibold text-[#FF9D23]">
                {batchName}
              </span>
            </p>
            {exam?.exam_datetime && (
              <>
                <span className="text-gray-300">|</span>
                <p className="font-myriad font-light text-gray-500">
                  Date:{" "}
                  <span className="font-ddin font-semibold text-blue-gray-700">
                    {new Date(exam.exam_datetime).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </>
            )}
            <span className="text-gray-300">|</span>
            <span
              className={`text-xs font-ddin font-semibold px-3 py-1 rounded-full border ${
                marksAddedCount === totalCount && totalCount > 0
                  ? "text-green-700 bg-green-50 border-green-200"
                  : marksAddedCount > 0
                    ? "text-orange-600 bg-orange-50 border-orange-200"
                    : "text-gray-500 bg-gray-50 border-gray-200"
              }`}
            >
              {marksAddedCount}/{totalCount} Marks Added
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm font-ddin text-gray-400 hover:text-[#DD4633] transition-colors mt-1"
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
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-[40vh]">
          <p className="text-2xl font-ddin font-semibold text-gray-400">
            Loading...
          </p>
        </div>
      )}

      {/* Students Table */}
      {!loading && (
        <>
          <Card className="h-full w-full shadow-sm">
            <CardBody className="overflow-auto px-0 py-0">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-[#e9e6e6]">
                    {[
                      "Roll No",
                      "Student Name",
                      "Marks",
                      "Comments",
                      "Action",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className={`p-4 ${i >= 2 ? "text-center" : ""}`}
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
                  {students.length > 0 ? (
                    students.map((student, index) => {
                      const result = exam?.results?.find(
                        (r) => r.student_id === student.student_id,
                      );
                      const isLast = index === students.length - 1;
                      const tdClass = isLast
                        ? "px-4 py-4 font-ddin"
                        : "px-4 py-4 border-b border-blue-gray-50 font-ddin";

                      return (
                        <tr
                          key={student.student_id}
                          className="hover:bg-[#f0eeee]"
                        >
                          <td className={tdClass}>
                            <Typography
                              variant="small"
                              className="font-ddin text-gray-500"
                            >
                              {student.rollno || "—"}
                            </Typography>
                          </td>
                          <td className={tdClass}>
                            <div className="flex items-center gap-2">
                              <div className=" flex items-center justify-center text-white text-xs font-ddin font-bold flex-shrink-0">
                                {student.name?.charAt(0)?.toUpperCase() || "?"}
                              </div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold font-ddin"
                              >
                                {student.name}
                              </Typography>
                            </div>
                          </td>
                          <td className={`${tdClass} text-center`}>
                            {result ? (
                              <span className="text-sm font-ddin font-bold text-green-600">
                                {result.marks} / {result.total_marks}
                              </span>
                            ) : (
                              <span className="text-sm font-ddin text-gray-300">
                                Not added
                              </span>
                            )}
                          </td>
                          <td className={`${tdClass} text-center`}>
                            <Typography
                              variant="small"
                              className="font-ddin text-gray-500"
                            >
                              {result?.comments || "—"}
                            </Typography>
                          </td>
                          <td className={`${tdClass} text-center`}>
                            <button
                              onClick={() => handleOpenMarksModal(student)}
                              className={`text-xs font-ddin font-semibold hover:underline ${
                                result ? "text-[#E68242]" : "text-[#DD4633]"
                              }`}
                            >
                              {result ? "Edit Marks" : "Add Marks"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center">
                        <Typography
                          variant="small"
                          className="font-ddin text-gray-400"
                        >
                          No students found in this batch.
                        </Typography>
                      </td>
                    </tr>
                  )}
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
      )}

      {/* Marks Modal */}
      <Dialog open={marksModal} handler={() => setMarksModal(false)} size="sm">
        <DialogHeader className="font-ddin flex flex-col items-start gap-0.5">
          <p className="text-lg font-bold font-ddin">{exam?.title}</p>
          <p className="text-sm font-myriad font-light text-gray-500">
            {selectedStudent?.name}{" "}
            {selectedStudent?.rollno && (
              <span className="text-[#FF9D23]">({selectedStudent.rollno})</span>
            )}
          </p>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Input
              label="Marks Obtained *"
              value={marksData.marks}
              onChange={(e) =>
                setMarksData({ ...marksData, marks: e.target.value })
              }
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
            />
            <Input
              label="Out of (Total) *"
              value={marksData.total_marks}
              onChange={(e) =>
                setMarksData({ ...marksData, total_marks: e.target.value })
              }
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{ className: "font-ddin" }}
            />
          </div>
          <Textarea
            label="Comments (optional)"
            value={marksData.comments}
            onChange={(e) =>
              setMarksData({ ...marksData, comments: e.target.value })
            }
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
          />
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="outlined"
            onClick={() => setMarksModal(false)}
            className="normal-case font-ddin shadow-none hover:shadow-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitMarks}
            disabled={submitting || !marksData.marks || !marksData.total_marks}
            className="normal-case font-ddin shadow-none hover:shadow-none bg-[#DD4633]"
          >
            {submitting ? "Saving..." : "Save Marks"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default AdminExamDetails;
