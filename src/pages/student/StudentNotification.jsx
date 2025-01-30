import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { MdNotifications } from "react-icons/md";

const Notification_Table_Data = [
  {
    id: 1,
    title: "New Assignment Added",
    message: "Complete the React To-Do App by Friday.",
    time: "10 mins ago",
    type: "assignment",
  },
  {
    id: 2,
    title: "Submission Deadline Extended",
    message: "The deadline for Node.js API project is now Sunday.",
    time: "1 hour ago",
    type: "update",
  },
  {
    id: 3,
    title: "New Message from Instructor",
    message: "Check your inbox for feedback on your last project.",
    time: "2 hours ago",
    type: "message",
  },
  {
    id: 4,
    title: "System Maintenance",
    message: "Scheduled downtime from 12 AM - 2 AM tonight.",
    time: "Yesterday",
    type: "alert",
  },
  {
    id: 5,
    title: "Course Update",
    message: "New React hooks module has been added to your course.",
    time: "2 days ago",
    type: "course",
  },
];

function StudentNotification() {
  return (
    <div className="p-3">
      <h1 className="text-3xl font-ddin font-semibold text-gray-800">
        Your Alerts, Your Updates—All in One Place!
      </h1>
      <Card className="mt-5 shadow-md">
        <CardBody className="p-0">
          <table className="w-full text-left">
            <tbody>
              {Notification_Table_Data.map(({ id, title, message, time }) => (
                <tr
                  key={id}
                  className="hover:bg-gray-100 transition flex justify-between border-b border-gray-200"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <MdNotifications className="w-6 h-6" />
                    <div className="flex flex-col justify-between h-full">
                      <Typography
                        variant="small"
                        className="font-semibold text-gray-900 font-ddin text-base"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-gray-600 text-sm font-ddin"
                      >
                        {message}
                      </Typography>
                    </div>
                  </td>
                  <td className="text-gray-500 text-sm font-ddin p-3">
                    <div className="flex h-full">
                      <Typography
                        variant="small"
                        className="text-gray-500 font-ddin text-xs md:text-sm text-end"
                      >
                        {time}
                      </Typography>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default StudentNotification;
