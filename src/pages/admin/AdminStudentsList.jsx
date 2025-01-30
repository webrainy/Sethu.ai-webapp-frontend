import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { ADMIN_STUDENTLIST_TABLE_HEAD } from "../../utils/constants";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const TABLE_ROWS = [
  {
    name: "Spotify",
    email: "spotify@gmail.com",
    phone: "9067876543",
    education: "Masters",
    year_of_passing: "2021",
    status: "pending",
  },
  {
    name: "Amazon",
    email: "amazon@gmail.com",
    phone: "876543234",
    education: "Masters",
    year_of_passing: "2021",
    status: "accepted",
  },
  {
    name: "Pinterest",
    email: "pinterest@gmail.com",
    phone: "6789876789",
    education: "Masters",
    year_of_passing: "2021",
    status: "rejected",
  },
  {
    name: "Google",
    email: "google@gmail.com",
    phone: "2343546512",
    education: "Masters",
    year_of_passing: "2021",
    status: "pending",
  },
  {
    name: "Netflix",
    email: "netflix@gmail.com",
    phone: "9887766554",
    education: "Masters",
    year_of_passing: "2021",
    status: "pending",
  },
];

function AdminStudentsList() {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    navigate("/admin/student/profile", { state: { user: rowData } });
  };

  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">Manage Student</p>

        <div className="w-72">
          <Input
            type="text"
            accessKey="s"
            label="Type Alt+S to search"
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            containerProps={{
              className: "font-ddin",
            }}
          />
        </div>
      </div>

      <Card className="h-fit w-full box-shadow mt-5">
        <CardBody className="overflow-auto px-0 py-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {ADMIN_STUDENTLIST_TABLE_HEAD.map((head) => (
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
                (
                  { name, email, education, phone, year_of_passing, status },
                  index
                ) => {
                  const rowData = {
                    name,
                    email,
                    education,
                    phone,
                    year_of_passing,
                    status,
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
                              className="font-semibold font-ddin hover:underline text-base"
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
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-ddin"
                        >
                          {status}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div className="flex items-center gap-6 justify-center mt-4">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={active === 1}
        >
          <HiArrowLeft className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="!block font-myriad font-light">
          Page <strong className="text-gray-900">{active}</strong> of{" "}
          <strong className="text-gray-900">10</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={active === 10}
        >
          <HiArrowRight className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}

export default AdminStudentsList;
