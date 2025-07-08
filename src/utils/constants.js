// export const base_url = "http://103.212.120.217:5932";
// // export const base_url = "http://34.45.12.76:5932";
export const base_url = "https://sethu.ai:5932";

export const mailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneNumber =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

export const strongPwd = /(?=.*[a-z])(?=.*)(?=.*[0-9])(?=.*[^a-z0-9])(?=.{8,})/;

export const urlRegex =
  /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/[\w\d-_.?=]*)*$/;

export const ADMIN_STUDENTLIST_TABLE_HEAD = [
  "Name",
  "Education",
  "Phone Number",
  "Year of Passing",
  "Review Status",
  "Batch Status",
  "Assigned to",
  "Assigned by",
];

export const REVIEWER_STUDENTLIST_TABLE_HEAD = [
  "Name",
  "Education",
  "Phone Number",
  "Year of Passing",
  "Review Status",
  "Batch Status",
];

export const ADMIN_BATCH_STUDENTLIST_TABLE_HEAD = [
  "Student Name",
  "Roll No.",
  "Education",
  "Email",
  "Phone number",
  "Class Att.",
  "Lab Att.",
  "Mentorship Att.",
  "",
];

export const EXPERTISE_LEVELS = [
  { label: "Beginner", value: 1 },
  { label: "Intermediate", value: 2 },
  { label: "Proficient", value: 3 },
  { label: "Advanced", value: 4 },
  { label: "Expert", value: 5 },
];

export const REVIEW_STATUS = [
  { label: "Not Started", value: 0 },
  { label: "In Progress", value: 1 },
  { label: "Accepted", value: 2 },
  { label: "Follow-up", value: 3 },
  { label: "Rejected", value: 4 },
  { label: "Unable to Decide", value: 5 },
];

export const BATCH_STATUS = [
  { label: "Not Assigned", value: 1 },
  { label: "Assigned", value: 2 },
];

export const EXAM_INTERVIEW_STATUS = [
  { label: "Pending", value: 0 },
  { label: "Pass", value: 1 },
  { label: "Fail", value: 2 },
];

export const Assignment_Table_Head = ["Assignments", "Status", "Added by"];

export const ADMIN_REVIEWER_TABLE_HEAD = [
  // "Reviewer Name",
  "Admin Name",
  "Phone Number",
  "Email",
];

export const ATTENDANCE_TAB_DATA = [
  {
    label: "Class",
    value: "1",
    desc: `It really matters and then like it really doesn't matter.`,
  },
  {
    label: "Lab",
    value: "2",
    desc: `Because it's about motivating the doers.`,
  },
  {
    label: "Mentorship",
    value: "3",
    desc: `We're constantly growing and making mistakes.`,
  },
];
