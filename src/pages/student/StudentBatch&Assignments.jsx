import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Assignment_Table_Head } from "../../utils/constants";

const Assignment_Table_Data = [
  { name: "Build a React To-Do App", status: "Completed" },
  { name: "Create a REST API with Node.js", status: "Completed" },
  { name: "Style a Dashboard with Tailwind CSS", status: "Pending" },
];

function StudentBatchAssignments() {
  const statusColors = {
    Completed: "text-green-600 bg-green-100 font-ddin",
    Pending: "text-red-600 bg-red-100 font-ddin",
  };

  return (
    <div className="p-3">
      <div className="gap-5 space-y-3">
        <p className="text-3xl font-ddin font-semibold">
          Hi, <span className="text-[#FF9D23]">Student name</span>
        </p>
        <h1 className="text-xl font-myriad font-semibold">
          This isn’t just a batch, it’s a legacy. Welcome to{" "}
          <span className="text-[#FF9D23]">Batch Name!</span>
        </h1>
      </div>
      <div>
        <Card className="h-full w-full box-shadow mt-4">
          <CardBody className="overflow-auto px-0 py-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {Assignment_Table_Head.map((head, index) => (
                    <th key={index} className="bg-[#e9e6e6] p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-70 font-ddin"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Assignment_Table_Data.map(({ name, status }, index) => {
                  const isLast = index === Assignment_Table_Data.length - 1;
                  const classes = isLast
                    ? "px-4 py-4 font-ddin"
                    : "px-4 py-4 border-b border-blue-gray-50 font-ddin";

                  return (
                    <tr key={index} className="hover:bg-[#f0eeee]">
                      <td className={classes}>
                        <div className="flex items-center gap-3 cursor-pointer">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold font-ddin"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3 cursor-pointer">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className={`border rounded-xl border-gray-300 px-4 py-2 ${statusColors[status]}`}
                          >
                            {status}
                          </Typography>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default StudentBatchAssignments;
