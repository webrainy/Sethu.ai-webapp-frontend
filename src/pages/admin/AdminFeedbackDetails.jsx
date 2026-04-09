import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../utils/constants";
import toast from "react-hot-toast";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const STAR_OPTIONS = [
  { value: 1, label: "1 - Poor" },
  { value: 2, label: "2 - Below Average" },
  { value: 3, label: "3 - Average" },
  { value: 4, label: "4 - Good" },
  { value: 5, label: "5 - Excellent" },
];

const FEEDBACK_TYPE = { SOFT_SKILL: 1, TECHNICAL: 2, JOB_NEED: 3 };

const DEFAULT_COLUMNS = {
  student_name: true,
  roll_no: true,
  education: false,
  cgpa: false,
  class_percent: true,
  lab_percent: false,
  exam_results: true,
  technical: true,
  job_need: true,
  soft_skill: true,
  comments: true,
};

const COLUMN_LABELS = {
  student_name: "Student Name",
  roll_no: "Roll No",
  education: "Education",
  cgpa: "CGPA",
  class_percent: "Class %",
  lab_percent: "Lab %",
  exam_results: "Exam Results",
  technical: "Technical",
  job_need: "Job Need",
  soft_skill: "Soft Skill",
  comments: "Comments",
};

function StarBadge({ value }) {
  if (!value) return <span className="text-gray-300 text-xs font-ddin">—</span>;
  const colors = {
    1: "text-red-600 bg-red-50 border-red-200",
    2: "text-orange-600 bg-orange-50 border-orange-200",
    3: "text-yellow-600 bg-yellow-50 border-yellow-200",
    4: "text-blue-600 bg-blue-50 border-blue-200",
    5: "text-green-600 bg-green-50 border-green-200",
  };
  const labels = {
    1: "Poor",
    2: "Below Avg",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };
  return (
    <span
      className={`text-xs font-ddin font-semibold px-2 py-0.5 rounded-lg border ${colors[value]}`}
    >
      {value} - {labels[value]}
    </span>
  );
}

function AdminFeedbackDetails() {
  const location = useLocation().state;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const batch_id = location?.batch_id;
  const batchName = location?.batchName;
  const feedbackPassed = location?.feedback;

  const [feedbackData, setFeedbackData] = useState(null);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const [editState, setEditState] = useState({});
  const [savingId, setSavingId] = useState(null);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  // Exam results dialog
  const [examDialog, setExamDialog] = useState(false);
  const [selectedStudentExams, setSelectedStudentExams] = useState(null);

  useEffect(() => {
    if (feedbackPassed?.feedback_id) fetchDetail(activePage);
  }, [activePage]);

  const fetchDetail = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${base_url}/api/feedback/detail?feedback_id=${feedbackPassed.feedback_id}&page=${page}&limit=${limit}`,
        { headers: { Authorization: access_token } },
      );
      const data = await res.json();
      if (data.responseCode === 200) {
        setFeedbackData(data.responseData?.feedback);
        setExams(data.responseData?.exams || []);
        setStudents(data.responseData?.students || []);
        setTotalPages(data.responseData?.totalPages || 1);
        setTotalCount(data.responseData?.totalCount || 0);

        const initEdit = {};
        data.responseData?.students?.forEach((s) => {
          initEdit[s.student_id] = {
            soft_skill: s.feedback?.soft_skill || "",
            technical: s.feedback?.technical || "",
            job_need: s.feedback?.job_need || "",
            comments: s.feedback?.comments || "",
          };
        });
        setEditState(initEdit);
      } else {
        toast.error("Failed to load feedback details.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (student_id, field, value) => {
    setEditState((prev) => ({
      ...prev,
      [student_id]: { ...prev[student_id], [field]: value },
    }));
  };

  const handleSave = async (student_id) => {
    const state = editState[student_id];
    if (!state.soft_skill || !state.technical || !state.job_need) {
      toast.error("Please fill all feedback dropdowns.");
      return;
    }
    setSavingId(student_id);
    try {
      const res = await fetch(`${base_url}/api/feedback/result/create`, {
        method: "POST",
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback_id: feedbackPassed.feedback_id,
          student_id,
          comments: state.comments,
          feedbacks: [
            {
              feedback_type: FEEDBACK_TYPE.SOFT_SKILL,
              feedback_star: Number(state.soft_skill),
            },
            {
              feedback_type: FEEDBACK_TYPE.TECHNICAL,
              feedback_star: Number(state.technical),
            },
            {
              feedback_type: FEEDBACK_TYPE.JOB_NEED,
              feedback_star: Number(state.job_need),
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.responseCode === 200) {
        toast.success("Feedback saved!");
        fetchDetail(activePage);
      } else {
        toast.error(data.responseMessage || "Failed to save.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSavingId(null);
    }
  };

  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const openExamDialog = (student) => {
    setSelectedStudentExams(student);
    setExamDialog(true);
  };

  return (
    <div className="p-4 min-h-screen bg-[#f7f7f7]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-3xl font-ddin font-bold text-blue-gray-900">
            {feedbackData?.title || feedbackPassed?.title || "Feedback Details"}
          </p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <p className="font-myriad font-light text-gray-500">
              Batch:{" "}
              <span className="font-ddin font-semibold text-[#FF9D23]">
                {batchName}
              </span>
            </p>
            {feedbackData?.feedback_date && (
              <>
                <span className="text-gray-300">|</span>
                <p className="font-myriad font-light text-gray-500">
                  Date:{" "}
                  <span className="font-ddin font-semibold text-blue-gray-700">
                    {new Date(feedbackData.feedback_date).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                </p>
              </>
            )}
            <span className="text-gray-300">|</span>
            <span className="text-xs font-ddin text-gray-400">
              {totalCount} students
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Column Toggle Button */}
          <div className="relative">
            <button
              onClick={() => setShowColumnPicker((p) => !p)}
              className="flex items-center gap-2 text-sm font-ddin font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-[#DD4633] transition-all shadow-sm"
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
                  d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18"
                />
              </svg>
              Columns
            </button>

            {/* Column Picker Dropdown */}
            {showColumnPicker && (
              <div className="absolute right-0 top-10 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-3 min-w-[180px]">
                <p className="text-xs font-ddin font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Toggle Columns
                </p>
                {Object.entries(COLUMN_LABELS).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-gray-50 px-1 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[key]}
                      onChange={() => toggleColumn(key)}
                      className="accent-[#DD4633] w-3.5 h-3.5"
                    />
                    <span className="text-sm font-ddin text-gray-700">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

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

      {/* Table */}
      {!loading && (
        <>
          <Card className="h-full w-full shadow-sm">
            <CardBody className="overflow-auto px-0 py-0">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-[#e9e6e6]">
                    {/* Always show # */}
                    <th className="p-3 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-70 font-ddin text-xs"
                      >
                        #
                      </Typography>
                    </th>
                    {Object.entries(COLUMN_LABELS).map(([key, label]) =>
                      visibleColumns[key] ? (
                        <th key={key} className="p-3 whitespace-nowrap ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold leading-none opacity-70 font-ddin text-md"
                          >
                            {label}
                          </Typography>
                        </th>
                      ) : null,
                    )}
                    {/* Always show Action */}
                    <th className="p-3 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-70 font-ddin text-md"
                      >
                        Action
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student, index) => {
                      const isLast = index === students.length - 1;
                      const tdClass = isLast
                        ? "px-3 py-3 font-ddin"
                        : "px-3 py-3 border-b border-blue-gray-50 font-ddin";
                      const edit = editState[student.student_id] || {};
                      const isSaving = savingId === student.student_id;
                      const hasFeedback = student.feedback?.hasFeedback;

                      return (
                        <tr
                          key={student.student_id}
                          className={`hover:bg-[#f9f9f9] transition-colors ${hasFeedback ? "border-l-4 border-l-green-400" : "border-l-4 border-l-transparent"}`}
                        >
                          {/* # */}
                          <td className={tdClass}>
                            <span className="text-xs font-ddin text-gray-400">
                              {(activePage - 1) * limit + index + 1}
                            </span>
                          </td>

                          {/* Student Name */}
                          {visibleColumns.student_name && (
                            <td className={tdClass}>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  {student.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold font-ddin whitespace-nowrap"
                                >
                                  {student.name}
                                </Typography>
                              </div>
                            </td>
                          )}

                          {/* Roll No */}
                          {visibleColumns.roll_no && (
                            <td className={tdClass}>
                              <Typography
                                variant="small"
                                className="font-ddin text-gray-500"
                              >
                                {student.rollno || "—"}
                              </Typography>
                            </td>
                          )}

                          {/* Education */}
                          {visibleColumns.education && (
                            <td className={tdClass}>
                              <Typography
                                variant="small"
                                className="font-ddin text-gray-600"
                              >
                                {student.education || "—"}
                              </Typography>
                            </td>
                          )}

                          {/* CGPA */}
                          {visibleColumns.cgpa && (
                            <td className={tdClass}>
                              <Typography
                                variant="small"
                                className="font-ddin text-gray-600"
                              >
                                {student.cgpa || "—"}
                              </Typography>
                            </td>
                          )}

                          {/* Class % */}
                          {visibleColumns.class_percent && (
                            <td className={tdClass}>
                              <span
                                className={`text-xs font-ddin font-semibold px-2 py-0.5 rounded-lg ${
                                  student.class_percent >= 75
                                    ? "text-green-700 bg-green-50"
                                    : student.class_percent >= 50
                                      ? "text-orange-600 bg-orange-50"
                                      : "text-red-600 bg-red-50"
                                }`}
                              >
                                {student.class_percent}%
                              </span>
                            </td>
                          )}

                          {/* Lab % */}
                          {visibleColumns.lab_percent && (
                            <td className={tdClass}>
                              <span
                                className={`text-xs font-ddin font-semibold px-2 py-0.5 rounded-lg ${
                                  student.lab_percent >= 75
                                    ? "text-green-700 bg-green-50"
                                    : student.lab_percent >= 50
                                      ? "text-orange-600 bg-orange-50"
                                      : "text-red-600 bg-red-50"
                                }`}
                              >
                                {student.lab_percent}%
                              </span>
                            </td>
                          )}

                          {/* Exam Results - Button opens dialog */}
                          {visibleColumns.exam_results && (
                            <td className={tdClass}>
                              <button
                                onClick={() => openExamDialog(student)}
                                className="flex items-center gap-1 text-xs font-ddin font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg hover:bg-blue-100 transition-all whitespace-nowrap"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                  />
                                </svg>
                                {exams.length} Exams
                              </button>
                            </td>
                          )}

                          {/* Technical Dropdown */}
                          {visibleColumns.technical && (
                            <td className={tdClass}>
                              <select
                                value={edit.technical || ""}
                                onChange={(e) =>
                                  handleEditChange(
                                    student.student_id,
                                    "technical",
                                    e.target.value,
                                  )
                                }
                                className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs font-ddin focus:outline-none focus:border-[#DD4633] bg-white min-w-[130px]"
                              >
                                <option value="">Select</option>
                                {STAR_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          )}

                          {/* Job Need Dropdown */}
                          {visibleColumns.job_need && (
                            <td className={tdClass}>
                              <select
                                value={edit.job_need || ""}
                                onChange={(e) =>
                                  handleEditChange(
                                    student.student_id,
                                    "job_need",
                                    e.target.value,
                                  )
                                }
                                className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs font-ddin focus:outline-none focus:border-[#DD4633] bg-white min-w-[130px]"
                              >
                                <option value="">Select</option>
                                {STAR_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          )}

                          {/* Soft Skill Dropdown */}
                          {visibleColumns.soft_skill && (
                            <td className={tdClass}>
                              <select
                                value={edit.soft_skill || ""}
                                onChange={(e) =>
                                  handleEditChange(
                                    student.student_id,
                                    "soft_skill",
                                    e.target.value,
                                  )
                                }
                                className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs font-ddin focus:outline-none focus:border-[#DD4633] bg-white min-w-[130px]"
                              >
                                <option value="">Select</option>
                                {STAR_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          )}

                          {/* Comments */}
                          {visibleColumns.comments && (
                            <td className={tdClass}>
                              <input
                                type="text"
                                value={edit.comments || ""}
                                onChange={(e) =>
                                  handleEditChange(
                                    student.student_id,
                                    "comments",
                                    e.target.value,
                                  )
                                }
                                placeholder="Add comment..."
                                className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs font-ddin focus:outline-none focus:border-[#DD4633] w-36"
                              />
                            </td>
                          )}

                          {/* Save Button - Always visible */}
                          <td className={tdClass}>
                            <button
                              onClick={() => handleSave(student.student_id)}
                              disabled={isSaving}
                              className={`text-xs font-ddin font-semibold px-3 py-1.5 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-all ${
                                hasFeedback
                                  ? "bg-[#E68242] hover:bg-[#d4712f]"
                                  : "bg-[#DD4633] hover:bg-[#c73d2c]"
                              }`}
                            >
                              {isSaving
                                ? "Saving..."
                                : hasFeedback
                                  ? "Update"
                                  : "Save"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={15} className="px-4 py-10 text-center">
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

      {/* Exam Results Dialog */}
      <Dialog open={examDialog} handler={() => setExamDialog(false)} size="md">
        <DialogHeader className="flex flex-col items-start gap-1 pb-2">
          <p className="text-lg font-ddin font-bold text-blue-gray-900">
            Exam Results
          </p>
          {selectedStudentExams && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#DD4633] flex items-center justify-center text-white text-xs font-bold">
                {selectedStudentExams.name?.charAt(0)?.toUpperCase()}
              </div>
              <p className="text-sm font-ddin font-semibold text-blue-gray-700">
                {selectedStudentExams.name}
                {selectedStudentExams.rollno && (
                  <span className="text-[#FF9D23] ml-1">
                    ({selectedStudentExams.rollno})
                  </span>
                )}
              </p>
            </div>
          )}
        </DialogHeader>
        <DialogBody className="pt-0">
          {selectedStudentExams?.exam_results?.length > 0 ? (
            <div className="flex flex-col gap-3">
              {selectedStudentExams.exam_results.map((exam, i) => {
                const hasMarks = exam.marks !== "—";
                const [marks, total] = hasMarks
                  ? exam.marks.split("/")
                  : [null, null];
                const percent = hasMarks
                  ? Math.round((Number(marks) / Number(total)) * 100)
                  : null;

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between bg-white rounded-xl border px-4 py-3 ${
                      hasMarks
                        ? "border-l-4 border-l-green-400 border-gray-100"
                        : "border-gray-100"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-ddin font-bold text-blue-gray-800">
                        {exam.title}
                      </p>
                      {hasMarks && (
                        <p className="text-xs font-ddin text-gray-400">
                          Score: {exam.marks}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {hasMarks ? (
                        <>
                          <span className="text-2xl font-ddin font-bold text-green-600">
                            {marks}
                          </span>
                          <span className="text-sm font-ddin text-gray-400">
                            / {total}
                          </span>
                          <span
                            className={`text-xs font-ddin font-semibold px-2 py-0.5 rounded-lg ml-1 ${
                              percent >= 75
                                ? "text-green-700 bg-green-50"
                                : percent >= 50
                                  ? "text-orange-600 bg-orange-50"
                                  : "text-red-600 bg-red-50"
                            }`}
                          >
                            {percent}%
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-ddin font-semibold px-3 py-1 rounded-full border text-gray-400 bg-gray-50 border-gray-200">
                          Not Added
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <p className="text-sm font-ddin text-gray-400">
                No exam results found.
              </p>
            </div>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default AdminFeedbackDetails;
