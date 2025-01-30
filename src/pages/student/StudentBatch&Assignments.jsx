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
          This isn't just a batch, it's a legacy. Welcome to{" "}
          <span className="text-[#FF9D23]">Batch Name!</span>
        </h1>
      </div>
      <div>
        <Card className="h-full w-full box-shadow mt-4">
          <CardBody className="overflow-auto px-0 py-0">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {Assignment_Table_Head.map((head, index) => (
                    <th
                      key={index}
                      className={`bg-[#e9e6e6] p-4 ${
                        index === Assignment_Table_Head.length - 1
                          ? "flex justify-end"
                          : ""
                      }`}
                    >
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
                        <div className="flex items-start flex-col gap-1">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold font-ddin"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            className="font-myriad font-light"
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Proin sed quam dui. Mauris consectetur libero
                            at sapien cursus lacinia. Pellentesque sagittis ac
                            risus vel placerat. Fusce sit amet urna condimentum,
                            tempor augue non, posuere lectus. Vestibulum dictum,
                            lectus eu faucibus fermentum, mi lectus ultrices
                            sem, vitae porttitor lectus felis sit amet nulla.
                            Vivamus ac faucibus leo, ut egestas nunc. Vestibulum
                            consequat feugiat erat ut feugiat.
                          </Typography>
                          <a
                            href="https://react-icons.github.io/"
                            target="_blank"
                            className="text-[#DD4633] text-base hover:underline"
                          >
                            Click here to check it out!
                          </a>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3 cursor-pointer justify-end">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className={`border rounded-xl border-gray-300 px-4 py-[2px] text-[13px] ${statusColors[status]}`}
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
