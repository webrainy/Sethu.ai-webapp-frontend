export const base_url = "http://103.212.120.217:5932";

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
  "Status",
];

export const ADMIN_BATCH_STUDENTLIST_TABLE_HEAD = [
  "Student Name",
  "Education",
  "Email",
  "Phone number",
];

export const EXPERTISE_LEVELS = [
  { label: "Beginner", value: 1 },
  { label: "Intermediate", value: 2 },
  { label: "Proficient", value: 3 },
  { label: "Advanced", value: 4 },
  { label: "Expert", value: 5 },
];

export const Assignment_Table_Head = ["Assignments", "Status"];
