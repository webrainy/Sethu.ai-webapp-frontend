export const mailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneNumber =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

export const strongPwd = /(?=.*[a-z])(?=.*)(?=.*[0-9])(?=.*[^a-z0-9])(?=.{8,})/;

export const ADMIN_STUDENTLIST_TABLE_HEAD = [
  "Name",
  "Education",
  "Phone Number",
  "Year of Passing",
  "Status",
];

export const EXPERTISE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Proficient",
  "Advanced",
  "Expert",
];

export const Assignment_Table_Head = ["Assignment", "Status"];
