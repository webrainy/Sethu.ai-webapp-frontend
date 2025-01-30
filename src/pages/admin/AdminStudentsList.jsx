import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "Name",
  "Education",
  "Phone Number",
  "Year of Passing",
  "Status",
];

const TABLE_ROWS = [
  {
    name: "Spotify",
    email: "spotify@gmail.com",
    phone: "9067876543",
    education: "Masters",
    year_of_passing: "2021",
  },
  {
    name: "Amazon",
    email: "amazon@gmail.com",
    phone: "876543234",
    education: "Masters",
    year_of_passing: "2021",
  },
  {
    name: "Pinterest",
    email: "pinterest@gmail.com",
    phone: "6789876789",
    education: "Masters",
    year_of_passing: "2021",
  },
  {
    name: "Google",
    email: "google@gmail.com",
    phone: "2343546512",
    education: "Masters",
    year_of_passing: "2021",
  },
  {
    name: "Netflix",
    email: "netflix@gmail.com",
    phone: "9887766554",
    education: "Masters",
    year_of_passing: "2021",
  },
];

function AdminStudentsList() {
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    navigate("/admin/staff/profile", { state: { user: rowData } });
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">Manage Student</p>
        {/* <Button className="shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]">
          Add Batch
        </Button> */}
      </div>

      <Card className="h-full w-full box-shadow">
        <CardBody className="overflow-auto px-0">
          <table className="w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className=" bg-[#e9e6e6] p-4">
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
              {TABLE_ROWS.map(
                ({ name, email, education, phone, year_of_passing }, index) => {
                  const rowData = {
                    name,
                    email,
                    education,
                    phone,
                    year_of_passing,
                  };
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4 font-ddin"
                    : "p-4 border-b border-blue-gray-50 font-ddin";

                  return (
                    <tr key={name} className="hover:bg-[#f0eeee]">
                      <td className={classes}>
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => handleRowClick(rowData)}
                        >
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold font-ddin hover:underline"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-400 font-ddin"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-ddin"
                        >
                          {education}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-ddin"
                        >
                          +91 {phone}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-ddin"
                        >
                          {year_of_passing}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 ">
          <Button variant="outlined" size="sm" className="font-ddin">
            Previous
          </Button>
          <div className="flex items-center gap-2 ">
            <IconButton variant="outlined" size="sm" className="font-ddin">
              1
            </IconButton>
            <IconButton variant="text" size="sm" className="font-ddin">
              2
            </IconButton>
            <IconButton variant="text" size="sm" className="font-ddin">
              ...
            </IconButton>
            <IconButton variant="text" size="sm" className="font-ddin">
              9
            </IconButton>
            <IconButton variant="text" size="sm" className="font-ddin">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm" className="font-ddin">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AdminStudentsList;
