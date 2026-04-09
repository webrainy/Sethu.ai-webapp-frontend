import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { base_url } from "../../utils/constants";

// ─── constants ─────────
const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Pending / Missed", value: 1 },
  { label: "Completed", value: 2 },
  { label: "Rejected", value: 3 },
];

const getStatusData = (n) =>
  n === 1
    ? { text: "Pending", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" }
    : n === 2
      ? {
          text: "Completed",
          color: "#16a34a",
          bg: "#f0fdf4",
          border: "#bbf7d0",
        }
      : n === 3
        ? {
            text: "Rejected",
            color: "#6b7280",
            bg: "#f9fafb",
            border: "#e5e7eb",
          }
        : {
            text: "Not Assigned",
            color: "#9ca3af",
            bg: "#f9fafb",
            border: "#f3f4f6",
          };

// ─── Stat Card ──────
function StatCard({ label, value, valueColor, bg, border, icon }) {
  return (
    <div
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: "16px",
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        flex: 1,
        minWidth: "130px",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: valueColor,
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            fontWeight: 600,
            marginTop: "3px",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── Main
function AdminMissedHomeworkReport() {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const [batches, setBatches] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [batchesLoading, setBatchesLoading] = useState(true);

  const [selectedBatch, setSelectedBatch] = useState(
    locationState?.batch_id || "",
  );
  const [statusFilter, setStatusFilter] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStudent, setExpandedStudent] = useState(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  useEffect(() => {
    if (selectedBatch) fetchReport(selectedBatch);
    else {
      setStudents([]);
      setAssignments([]);
    }
  }, [selectedBatch]);

  const fetchBatches = async () => {
    try {
      setBatchesLoading(true);
      const res = await fetch(`${base_url}/api/batch/list`, {
        headers: { Authorization: access_token },
      });
      const data = await res.json();
      if (data.responseCode === 200) {
        const batchList =
          data.responseData?.batchData || data.responseData || [];
        setBatches(batchList);
        if (!locationState?.batch_id) {
          const current = batchList?.find((b) => b.is_current === 1);
          if (current) setSelectedBatch(current.batch_id);
        }
      } else {
        if (locationState?.batch_id && locationState?.batchName) {
          setBatches([
            {
              batch_id: locationState.batch_id,
              name: locationState.batchName,
              is_current: 1,
            },
          ]);
        } else toast.error("Failed to load batches.");
      }
    } catch {
      if (locationState?.batch_id && locationState?.batchName) {
        setBatches([
          {
            batch_id: locationState.batch_id,
            name: locationState.batchName,
            is_current: 1,
          },
        ]);
      } else toast.error("Failed to load batches.");
    } finally {
      setBatchesLoading(false);
    }
  };

  const fetchReport = async (batch_id) => {
    try {
      setLoading(true);
      setExpandedStudent(null);
      const res = await fetch(
        `${base_url}/api/assign/report?batch_id=${batch_id}`,
        { headers: { Authorization: access_token } },
      );
      const data = await res.json();
      if (data.responseCode === 200) {
        setStudents(data.responseData?.students || []);
        setAssignments(data.responseData?.assignments || []);
      } else toast.error("Failed to load report.");
    } catch (err) {
      console.log("Report error:", err);
      toast.error("Something went wrong loading the report.");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      !searchQuery ||
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollno?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (!statusFilter) return true;
    return student.assignmentStatus?.some(
      (a) => a.compl_status === Number(statusFilter),
    );
  });

  const totalStudents = students.length;
  const missedCount = students.filter((s) =>
    s.assignmentStatus?.some((a) => a.compl_status === 1),
  ).length;
  const allDoneCount = students.filter(
    (s) =>
      s.assignmentStatus?.length > 0 &&
      s.assignmentStatus?.every((a) => a.compl_status === 2),
  ).length;
  const totalMissedAssignments = students.reduce(
    (acc, s) =>
      acc +
      (s.assignmentStatus?.filter((a) => a.compl_status === 1).length || 0),
    0,
  );

  const exportCSV = () => {
    if (!students.length || !assignments.length) return;
    const batchName =
      batches.find((b) => b.batch_id === selectedBatch)?.name || "batch";
    const headers = [
      "Roll No",
      "Student Name",
      ...assignments.map((a) => a.title),
      "Pending",
      "Completed",
      "Rejected",
    ];
    const rows = students.map((student) => {
      const statusMap = {};
      student.assignmentStatus?.forEach((a) => {
        statusMap[a.assignment_id] = a.compl_status;
      });
      const cells = assignments.map((a) => {
        const s = statusMap[a.assignment_id];
        return s === 1
          ? "Pending"
          : s === 2
            ? "Completed"
            : s === 3
              ? "Rejected"
              : "Not Assigned";
      });
      const p =
        student.assignmentStatus?.filter((a) => a.compl_status === 1).length ||
        0;
      const c =
        student.assignmentStatus?.filter((a) => a.compl_status === 2).length ||
        0;
      const r =
        student.assignmentStatus?.filter((a) => a.compl_status === 3).length ||
        0;
      return [student.rollno || "-", student.name, ...cells, p, c, r];
    });
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `missed_homework_${batchName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedBatchName =
    batches.find((b) => b.batch_id === selectedBatch)?.name ||
    locationState?.batchName ||
    "";

  return (
    <div
      style={{
        padding: "28px 28px 48px",
        minHeight: "100vh",
        background: "#f4f5f7",
      }}
    >
      <style>{`
        .hw-row { transition: background 0.15s; }
        .hw-row:hover { background: #f8f9ff !important; }
        .expand-panel { animation: slideDown 0.2s ease; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .action-btn { transition: color 0.15s, background 0.15s; }
        .manage-btn:hover { color: #DD4633 !important; }
        .view-btn:hover { color: #2563eb !important; }
        .export-btn:hover { background: #c73d2c !important; }
        .filter-select:focus { outline: none; border-color: #DD4633 !important; box-shadow: 0 0 0 2px #DD463322; }
        .filter-input:focus { outline: none; border-color: #DD4633 !important; box-shadow: 0 0 0 2px #DD463322; }
        .student-row-pending { border-left: 4px solid #ef4444; }
        .student-row-ok { border-left: 4px solid transparent; }
      `}</style>

      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#DD4633",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Reports
          </p>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#111827",
              margin: "0 0 6px",
              lineHeight: 1.2,
            }}
          >
            Missed Homework Report
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#9ca3af",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Track pending and missed assignments across students
            {selectedBatchName && (
              <span
                style={{ color: "#FF9D23", fontWeight: 700, marginLeft: "6px" }}
              >
                — {selectedBatchName}
              </span>
            )}
          </p>
        </div>

        <button
          className="export-btn"
          onClick={exportCSV}
          disabled={!students.length}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#DD4633",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: students.length ? "pointer" : "not-allowed",
            opacity: students.length ? 1 : 0.4,
            transition: "background 0.2s",
          }}
        >
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4 4 4-4M12 4v12"
            />
          </svg>
          Export CSV
        </button>
      </div>

      {/* ── Filters ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          border: "1.5px solid #e5e7eb",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          gap: "16px",
        }}
      >
        {/* Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{
              fontSize: "10px",
              fontWeight: 700,
              padding: "0px 0px 4px ",
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Assignment Status
          </label>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              border: "1.5px solid #e5e7eb",
              borderRadius: "9px",
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#374151",
              background: "#fff",
              minWidth: "180px",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Search Student
          </label>
          <div style={{ position: "relative" }}>
            <svg
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#9ca3af"
              strokeWidth={2}
              style={{
                position: "absolute",
                left: "11px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              className="filter-input"
              type="text"
              placeholder="Name or Roll No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: "9px",
                padding: "8px 14px 8px 34px",
                fontSize: "13px",
                color: "#374151",
                width: "220px",
                transition: "border-color 0.2s",
              }}
            />
          </div>
        </div>

        {/* Reset */}
        {(statusFilter !== "1" || searchQuery) && (
          <button
            onClick={() => {
              setStatusFilter("1");
              setSearchQuery("");
            }}
            style={{
              background: "none",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              color: "#DD4633",
              cursor: "pointer",
              padding: "0 10px 9px",
              marginBottom: "2px",
            }}
          >
            ✕ Reset filters
          </button>
        )}
      </div>

      {/* ── Summary Cards ── */}
      {selectedBatch && !loading && students.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "14px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <StatCard
            label="Total Students"
            value={totalStudents}
            valueColor="#111827"
            bg="#fff"
            border="#e5e7eb"
            icon={
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6b7280"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />
          <StatCard
            label="Have Pending"
            value={missedCount}
            valueColor="#dc2626"
            bg="#fef2f2"
            border="#fecaca"
            icon={
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#dc2626"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          />
          <StatCard
            label="Missed Assignments"
            value={totalMissedAssignments}
            valueColor="#ea580c"
            bg="#fff7ed"
            border="#fed7aa"
            icon={
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ea580c"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M10 12l2 2 4-4"
                />
              </svg>
            }
          />
          <StatCard
            label="Fully Completed"
            value={allDoneCount}
            valueColor="#16a34a"
            bg="#f0fdf4"
            border="#bbf7d0"
            icon={
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#16a34a"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>
      )}

      {/* ── Empty State ── */}
      {!selectedBatch && !batchesLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "40vh",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "14px",
            }}
          >
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#d1d5db"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6M3 21h18M5 7l7-4 7 4"
              />
            </svg>
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#6b7280",
              margin: "0 0 6px",
            }}
          >
            Select a batch to view the report
          </p>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            Choose a batch from the filter above to get started
          </p>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                border: "3px solid #f3f4f6",
                borderTop: "3px solid #DD4633",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p style={{ fontSize: "14px", color: "#9ca3af", fontWeight: 500 }}>
              Loading report...
            </p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ── Table ── */}
      {!loading && selectedBatch && (
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1.5px solid #e5e7eb",
            overflow: "hidden",
            boxShadow: "0 2px 12px 0 rgba(60,60,80,0.06)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "auto",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8f9fa",
                    borderBottom: "1.5px solid #e5e7eb",
                  }}
                >
                  {[
                    "Roll No",
                    "Student Name",
                    "Total",
                    "Pending",
                    "Completed",
                    "Rejected",
                    "Action",
                  ].map((head, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "13px 16px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        whiteSpace: "nowrap",
                        textAlign:
                          i >= 2 && i <= 5
                            ? "center"
                            : i === 6
                              ? "right"
                              : "left",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => {
                    const total = student.assignmentStatus?.length || 0;
                    const pending =
                      student.assignmentStatus?.filter(
                        (a) => a.compl_status === 1,
                      ).length || 0;
                    const completed =
                      student.assignmentStatus?.filter(
                        (a) => a.compl_status === 2,
                      ).length || 0;
                    const rejected =
                      student.assignmentStatus?.filter(
                        (a) => a.compl_status === 3,
                      ).length || 0;
                    const isExpanded = expandedStudent === student.student_id;
                    const isLast = index === filteredStudents.length - 1;

                    return (
                      <React.Fragment key={student.student_id}>
                        <tr
                          className={`hw-row ${pending > 0 ? "student-row-pending" : "student-row-ok"}`}
                          style={{
                            borderBottom:
                              isLast && !isExpanded
                                ? "none"
                                : "1px solid #f3f4f6",
                            background: "#fff",
                          }}
                        >
                          {/* Roll No */}
                          <td style={{ padding: "14px 16px" }}>
                            <span
                              style={{
                                fontSize: "13px",
                                color: "#9ca3af",
                                fontWeight: 500,
                              }}
                            >
                              {student.rollno || "—"}
                            </span>
                          </td>

                          {/* Name */}
                          <td style={{ padding: "14px 16px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <div style={{}}></div>
                              <div>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "#111827",
                                  }}
                                >
                                  {student.name || "—"}
                                </div>
                                {student.batchInfo?.name && (
                                  <div
                                    style={{
                                      fontSize: "11px",
                                      color: "#9ca3af",
                                      marginTop: "1px",
                                    }}
                                  >
                                    {student.batchInfo.name}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Total */}
                          <td
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#374151",
                                background: "#f3f4f6",
                                padding: "3px 10px",
                                borderRadius: "20px",
                              }}
                            >
                              {total}
                            </span>
                          </td>

                          {/* Pending */}
                          <td
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                            }}
                          >
                            {pending > 0 ? (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  fontSize: "12px",
                                  fontWeight: 800,
                                  color: "#dc2626",
                                  background: "#fef2f2",
                                  border: "1px solid #fecaca",
                                  padding: "3px 10px",
                                  borderRadius: "20px",
                                }}
                              >
                                ⚠ {pending}
                              </span>
                            ) : (
                              <span
                                style={{
                                  fontSize: "13px",
                                  color: "#d1d5db",
                                  fontWeight: 600,
                                }}
                              >
                                0
                              </span>
                            )}
                          </td>

                          {/* Completed */}
                          <td
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: completed > 0 ? "#16a34a" : "#d1d5db",
                              }}
                            >
                              {completed}
                            </span>
                          </td>

                          {/* Rejected */}
                          <td
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: rejected > 0 ? "#6b7280" : "#d1d5db",
                              }}
                            >
                              {rejected}
                            </span>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: "14px 16px" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "12px",
                                alignItems: "center",
                              }}
                            >
                              <button
                                className="action-btn view-btn"
                                onClick={() =>
                                  setExpandedStudent(
                                    isExpanded ? null : student.student_id,
                                  )
                                }
                                style={{
                                  background: "none",
                                  border: "none",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  color: "#3b82f6",
                                  cursor: "pointer",
                                  padding: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  {isExpanded ? (
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                    />
                                  ) : (
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  )}
                                </svg>
                                {isExpanded ? "Hide" : "Details"}
                              </button>
                              <button
                                className="action-btn manage-btn"
                                onClick={() =>
                                  navigate(
                                    "/admin/batch/student/assignment_details",
                                    {
                                      state: {
                                        student_id: student.student_id,
                                        name: student.name,
                                        rollno: student.rollno,
                                      },
                                    },
                                  )
                                }
                                style={{
                                  background: "none",
                                  border: "none",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  color: "#E68242",
                                  cursor: "pointer",
                                  padding: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Manage
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* ── Expanded breakdown ── */}
                        {isExpanded && (
                          <tr>
                            <td
                              colSpan={7}
                              style={{
                                background: "#f8faff",
                                borderBottom: "1px solid #e0e7ff",
                                padding: "0",
                              }}
                            >
                              <div
                                className="expand-panel"
                                style={{ padding: "20px 24px" }}
                              >
                                {/* Panel header */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "14px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "3px",
                                      height: "18px",
                                      background: "#3b82f6",
                                      borderRadius: "2px",
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: 800,
                                      color: "#1e3a5f",
                                    }}
                                  >
                                    Assignment Breakdown —{" "}
                                    <span style={{ color: "#DD4633" }}>
                                      {student.name}
                                    </span>
                                  </span>
                                </div>

                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                      "repeat(auto-fill, minmax(280px, 1fr))",
                                    gap: "10px",
                                  }}
                                >
                                  {assignments.map((assignment) => {
                                    const studentStatus =
                                      student.assignmentStatus?.find(
                                        (a) =>
                                          a.assignment_id ===
                                          assignment.assignment_id,
                                      );
                                    const sd = getStatusData(
                                      studentStatus?.compl_status,
                                    );
                                    const submission =
                                      studentStatus?.studentSubmission;

                                    return (
                                      <div
                                        key={assignment.assignment_id}
                                        style={{
                                          background: "#fff",
                                          borderRadius: "12px",
                                          border: `1.5px solid ${studentStatus?.compl_status === 1 ? "#fecaca" : "#e5e7eb"}`,
                                          borderLeft: `4px solid ${sd.color}`,
                                          padding: "12px 14px",
                                          display: "flex",
                                          alignItems: "flex-start",
                                          justifyContent: "space-between",
                                          gap: "10px",
                                        }}
                                      >
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <p
                                            style={{
                                              fontSize: "13px",
                                              fontWeight: 700,
                                              color: "#111827",
                                              margin: "0 0 3px",
                                            }}
                                          >
                                            {assignment.title}
                                          </p>
                                          {assignment.description && (
                                            <p
                                              style={{
                                                fontSize: "12px",
                                                color: "#9ca3af",
                                                margin: "0 0 4px",
                                                lineHeight: 1.4,
                                              }}
                                            >
                                              {assignment.description}
                                            </p>
                                          )}
                                          {submission?.assignment_url && (
                                            <a
                                              href={submission.assignment_url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{
                                                fontSize: "11px",
                                                color: "#DD4633",
                                                textDecoration: "none",
                                                fontWeight: 600,
                                              }}
                                            >
                                              View Submission 
                                            </a>
                                          )}
                                          {submission?.createdAt && (
                                            <p
                                              style={{
                                                fontSize: "11px",
                                                color: "#9ca3af",
                                                margin: "3px 0 0",
                                              }}
                                            >
                                              Submitted:{" "}
                                              {new Date(
                                                submission.createdAt,
                                              ).toLocaleString()}
                                            </p>
                                          )}
                                          {!studentStatus && (
                                            <p
                                              style={{
                                                fontSize: "11px",
                                                color: "#9ca3af",
                                                fontStyle: "italic",
                                                margin: 0,
                                              }}
                                            >
                                              Not yet assigned
                                            </p>
                                          )}
                                        </div>
                                        <span
                                          style={{
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: sd.color,
                                            background: sd.bg,
                                            border: `1px solid ${sd.border}`,
                                            padding: "3px 10px",
                                            borderRadius: "20px",
                                            whiteSpace: "nowrap",
                                            flexShrink: 0,
                                          }}
                                        >
                                          {sd.text}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ padding: "48px 16px", textAlign: "center" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="22"
                            height="22"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#d1d5db"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#9ca3af",
                            margin: 0,
                          }}
                        >
                          {students.length === 0
                            ? "No students found for this batch."
                            : "No students match the selected filters."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {filteredStudents.length > 0 && (
            <div
              style={{
                padding: "10px 20px",
                background: "#f8f9fa",
                borderTop: "1px solid #f3f4f6",
                fontSize: "12px",
                color: "#9ca3af",
                fontWeight: 500,
              }}
            >
              Showing{" "}
              <strong style={{ color: "#374151" }}>
                {filteredStudents.length}
              </strong>{" "}
              of <strong style={{ color: "#374151" }}>{students.length}</strong>{" "}
              students
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminMissedHomeworkReport;
