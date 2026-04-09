import React, { useEffect, useState } from "react";
import {
  fetchAssignment,
  updateAssignmentStatus,
} from "../../redux/assignmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ManageAssignStatusModal from "../../components/modal/admin/ManageAssignStatusModal";
import toast from "react-hot-toast";
import { base_url } from "../../utils/constants";

const getStatusData = (n) =>
  n === 1
    ? {
        text: "Pending",
        dot: "#ef4444",
        badge: "background:#fef2f2; color:#dc2626; border:1px solid #fecaca;",
        barColor: "#ef4444",
      }
    : n === 2
      ? {
          text: "Completed",
          dot: "#22c55e",
          badge: "background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0;",
          barColor: "#22c55e",
        }
      : n === 3
        ? {
            text: "Rejected",
            dot: "#9ca3af",
            badge:
              "background:#f9fafb; color:#6b7280; border:1px solid #e5e7eb;",
            barColor: "#9ca3af",
          }
        : {
            text: "—",
            dot: "#d1d5db",
            badge:
              "background:#f9fafb; color:#9ca3af; border:1px solid #f3f4f6;",
            barColor: "#d1d5db",
          };

const isImage = (f) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f);
const isPDF = (f) => /\.pdf$/i.test(f);
const FILE_BASE_URL = `${base_url}/assignments`;

function FilePreview({ file }) {
  const [imgError, setImgError] = useState(false);
  const url = `${FILE_BASE_URL}/${file}`;

  if (isImage(file) && !imgError) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "relative",
          display: "block",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1.5px solid #e5e7eb",
          transition: "border-color 0.2s, transform 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#DD4633";
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <img
          src={url}
          alt={file}
          onError={() => setImgError(true)}
          style={{
            width: "130px",
            height: "100px",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.2s",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
          className="img-overlay"
        >
          View
        </div>
      </a>
    );
  }

  if (isPDF(file)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#fff5f5",
          border: "1.5px solid #fecaca",
          borderRadius: "10px",
          padding: "10px 14px",
          textDecoration: "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#fee2e2")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#fff5f5")}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: "#fecaca",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#dc2626"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#b91c1c",
              maxWidth: "110px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {file}
          </div>
          <div style={{ fontSize: "10px", color: "#f87171", marginTop: "1px" }}>
            PDF Document
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "#f9fafb",
        border: "1.5px solid #e5e7eb",
        borderRadius: "10px",
        padding: "10px 14px",
        textDecoration: "none",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#f9fafb")}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "8px",
          background: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6b7280"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </div>
      <div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#374151",
            maxWidth: "110px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {file}
        </div>
        <div style={{ fontSize: "10px", color: "#9ca3af", marginTop: "1px" }}>
          Attachment
        </div>
      </div>
    </a>
  );
}

/* ── Stat Card ── */
function StatCard({ label, value, color, bg, border }) {
  return (
    <div
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: "14px",
        padding: "14px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        minWidth: "90px",
      }}
    >
      <span
        style={{
          fontSize: "28px",
          fontWeight: 800,
          color,
          lineHeight: 1,
          fontFamily: "inherit",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "11px",
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function AdminAssignmentDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");
  const { assignment_list, student_info } = useSelector(
    (state) => state.assignment,
  );
  const location = useLocation().state;
  const [modal, setModal] = useState({ status_update: false });
  const [data, setData] = useState({ compl_status: "", assign_id: "" });
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    dispatch(
      fetchAssignment({
        end_point: `/api/assign/student?student_id=${location.student_id}`,
        access_token,
      }),
    ).unwrap();
  }, [dispatch]);

  const handleStatusUpdateModal = (assgn_data) => {
    setModal({ ...modal, status_update: true });
    setData({
      compl_status: assgn_data.compl_status,
      assign_id: assgn_data.assign_id,
    });
  };

  const handleChange = (e) => setData({ ...data, compl_status: e });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      updateAssignmentStatus({
        end_point: `/api/assign/status?assign_id=${data.assign_id}`,
        access_token,
        assgn_data: { compl_status: data.compl_status },
      }),
    ).unwrap();
    if (result.responseCode === 200) {
      toast.success("Assignment status updated.");
      setModal({ ...modal, status_update: false });
      dispatch(
        fetchAssignment({
          end_point: `/api/assign/student?student_id=${location.student_id}`,
          access_token,
        }),
      );
    } else {
      toast.error(
        result.responseMessage || "Connection failed. Please try again.",
      );
    }
  };

  const pending = assignment_list.filter((a) => a.compl_status === 1).length;
  const completed = assignment_list.filter((a) => a.compl_status === 2).length;
  const rejected = assignment_list.filter((a) => a.compl_status === 3).length;

  return (
    <React.Fragment>
      <style>{`
        .assign-card { transition: box-shadow 0.2s, transform 0.18s; }
        .assign-card:hover { box-shadow: 0 6px 32px 0 rgba(60,60,80,0.10); transform: translateY(-1px); }
        .submission-section { animation: slideDown 0.22s ease; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .update-btn:hover { color: #DD4633 !important; }
        .view-btn:hover { color: #2563eb !important; }
        .back-btn:hover { color: #DD4633 !important; }
      `}</style>

      <div
        style={{
          padding: "28px 28px 48px",
          minHeight: "100vh",
          background: "#f4f5f7",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#DD4633",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Assignment Management
            </p>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#111827",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Manage Assignments
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#fde8e5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#DD4633"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {location?.name || "—"}
                </span>
                {location?.rollno && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#FF9D23",
                      fontWeight: 700,
                      background: "#fff8ed",
                      border: "1px solid #fde68a",
                      borderRadius: "6px",
                      padding: "1px 8px",
                    }}
                  >
                    {location.rollno}
                  </span>
                )}
              </div>
              {student_info[0]?.batchInfo?.name && (
                <>
                  <span style={{ color: "#d1d5db", fontSize: "16px" }}>·</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#9ca3af"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        fontWeight: 500,
                      }}
                    >
                      {student_info[0].batchInfo.name}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              borderRadius: "10px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#6b7280",
              cursor: "pointer",
              transition: "color 0.2s",
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Report
          </button>
        </div>

        {/* ── Stat Cards ── */}
        {assignment_list.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "28px",
              flexWrap: "wrap",
            }}
          >
            <StatCard
              label="Total"
              value={assignment_list.length}
              color="#111827"
              bg="#ffffff"
              border="#e5e7eb"
            />
            <StatCard
              label="Pending"
              value={pending}
              color="#dc2626"
              bg="#fef2f2"
              border="#fecaca"
            />
            <StatCard
              label="Completed"
              value={completed}
              color="#16a34a"
              bg="#f0fdf4"
              border="#bbf7d0"
            />
            <StatCard
              label="Rejected"
              value={rejected}
              color="#6b7280"
              bg="#f9fafb"
              border="#e5e7eb"
            />
          </div>
        )}

        {/* ── Assignment Cards ── */}
        {assignment_list.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {assignment_list.map((assignment, idx) => {
              const { assignmentInfo, compl_status, studentSubmission } =
                assignment;
              const { title, description, url, createdBy } =
                assignmentInfo || {};
              const statusData = getStatusData(compl_status);
              const isExpanded = expandedRow === assignment.assign_id;
              const hasSubmission = !!studentSubmission;

              return (
                <div
                  key={assignment.assign_id}
                  className="assign-card"
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1.5px solid #e5e7eb",
                    overflow: "hidden",
                    boxShadow: "0 1px 6px 0 rgba(60,60,80,0.06)",
                    position: "relative",
                  }}
                >
                  {/* Left color bar */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "4px",
                      background: statusData.barColor,
                      borderRadius: "16px 0 0 16px",
                    }}
                  />

                  {/* Card header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      padding: "18px 20px 18px 24px",
                      gap: "16px",
                    }}
                  >
                    {/* Left: index + info */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "#f4f5f7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "13px",
                          fontWeight: 800,
                          color: "#9ca3af",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: 800,
                            color: "#111827",
                            margin: "0 0 4px",
                            textTransform: "capitalize",
                          }}
                        >
                          {title || "No Title"}
                        </p>
                        {description && (
                          <p
                            style={{
                              fontSize: "15px",
                              color: "#6b7280",
                              margin: "0 0 4px",
                              lineHeight: 1.5,
                            }}
                          >
                            {description}
                          </p>
                        )}
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: "14px",
                              color: "#DD4633",
                              textDecoration: "none",
                              fontWeight: 600,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            View assignment link
                            <svg
                              width="11"
                              height="11"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            marginTop: "6px",
                          }}
                        >
                          {/* <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#d1d5db"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg> */}
                          {/* <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                            Added by{" "}
                            <span style={{ fontWeight: 700, color: "#6b7280" }}>
                              {createdBy?.name || "-"}
                            </span>
                          </span> */}
                        </div>
                      </div>
                    </div>

                    {/* Right: status + actions */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "10px",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "4px 12px",
                          borderRadius: "20px",
                          letterSpacing: "0.04em",
                          ...Object.fromEntries(
                            statusData.badge
                              .split(";")
                              .filter(Boolean)
                              .map((s) => {
                                const [k, v] = s
                                  .split(":")
                                  .map((x) => x.trim());
                                const camel = k.replace(/-([a-z])/g, (_, c) =>
                                  c.toUpperCase(),
                                );
                                return [camel, v];
                              }),
                          ),
                        }}
                      >
                        {statusData.text}
                      </span>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        {hasSubmission && (
                          <button
                            className="view-btn"
                            onClick={() =>
                              setExpandedRow(
                                isExpanded ? null : assignment.assign_id,
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
                              transition: "color 0.2s",
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              )}
                            </svg>
                            {isExpanded ? "Hide" : "Submission"}
                          </button>
                        )}
                        <button
                          className="update-btn"
                          onClick={() => handleStatusUpdateModal(assignment)}
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
                            transition: "color 0.2s",
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
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ── Submission Panel ── */}
                  {isExpanded && hasSubmission && (
                    <div
                      className="submission-section"
                      style={{
                        borderTop: "1.5px solid #eff6ff",
                        background:
                          "linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)",
                        padding: "20px 24px",
                      }}
                    >
                      {/* Panel header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
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
                              fontSize: "13px",
                              fontWeight: 800,
                              color: "#1e3a5f",
                            }}
                          >
                            Student Submission
                          </span>
                        </div>
                        {studentSubmission.createdAt && (
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#6b7280",
                              background: "#fff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                              padding: "3px 10px",
                              fontWeight: 500,
                            }}
                          >
                            {new Date(
                              studentSubmission.createdAt,
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {/* Submission URL */}
                        {studentSubmission.assignment_url && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              background: "#fff",
                              borderRadius: "12px",
                              border: "1px solid #dbeafe",
                              padding: "12px 16px",
                            }}
                          >
                            <div
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "9px",
                                background: "#eff6ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#3b82f6"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                              </svg>
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  color: "#93c5fd",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                  marginBottom: "3px",
                                }}
                              >
                                Submission URL
                              </div>
                              <a
                                href={studentSubmission.assignment_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: "13px",
                                  color: "#DD4633",
                                  textDecoration: "none",
                                  wordBreak: "break-all",
                                  fontWeight: 500,
                                }}
                              >
                                {studentSubmission.assignment_url}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Student Note */}
                        {studentSubmission.assignment_description && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              background: "#fff",
                              borderRadius: "12px",
                              border: "1px solid #fef9c3",
                              padding: "12px 16px",
                            }}
                          >
                            <div
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "9px",
                                background: "#fefce8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#eab308"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  color: "#fbbf24",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                  marginBottom: "3px",
                                }}
                              >
                                Student Note
                              </div>
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "#374151",
                                  margin: 0,
                                  lineHeight: 1.6,
                                }}
                              >
                                {studentSubmission.assignment_description}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Attached Files */}
                        {studentSubmission.assignment_doc?.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              background: "#fff",
                              borderRadius: "12px",
                              border: "1px solid #dcfce7",
                              padding: "12px 16px",
                            }}
                          >
                            <div
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "9px",
                                background: "#f0fdf4",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: "2px",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#22c55e"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                              </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  color: "#86efac",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                  marginBottom: "8px",
                                }}
                              >
                                Attached Files (
                                {studentSubmission.assignment_doc.length})
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "8px",
                                }}
                              >
                                {studentSubmission.assignment_doc.map(
                                  (file, i) => (
                                    <FilePreview key={i} file={file} />
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {isExpanded && !hasSubmission && (
                    <div
                      style={{
                        borderTop: "1px solid #f3f4f6",
                        background: "#f9fafb",
                        padding: "14px 24px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#9ca3af",
                          fontStyle: "italic",
                          margin: 0,
                        }}
                      >
                        No submission details found.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "40vh",
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
                marginBottom: "12px",
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#9ca3af",
                margin: 0,
              }}
            >
              No assignments found
            </p>
            <p style={{ fontSize: "13px", color: "#d1d5db", marginTop: "6px" }}>
              This student has no assignments assigned yet.
            </p>
          </div>
        )}
      </div>

      <ManageAssignStatusModal
        open={modal.status_update}
        close={() => setModal({ ...modal, status_update: false })}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}

export default AdminAssignmentDetails;
