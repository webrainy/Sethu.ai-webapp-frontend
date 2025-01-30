import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { ADMIN_BATCH_STUDENTLIST_TABLE_HEAD } from "../../utils/constants";
import AssignAssignementModal from "../../components/modal/student/AssignAssignementModal";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

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

function AdminBatchDetails() {
  const [modal, setModal] = useState({
    all_students: false,
    particular_statudents: false,
  });
  const [data, setData] = useState({
    assgn_title: "",
    assgn_desc: "",
    assgn_url: "",
    student_list: [],
  });

  const handleAssignmentForAll = () => {
    setModal({ ...modal, all_students: true });
    setData({
      ...data,
      assgn_title: "",
      assgn_desc: "",
      assgn_url: "",
      student_list: [],
    });
  };

  const handleAssignmentForParticularStudent = () => {
    setModal({ ...modal, particular_statudents: true });
    setData({
      ...data,
      assgn_title: "",
      assgn_desc: "",
      assgn_url: "",
      student_list: [],
    });
  };

  // Function to export data to CSV
  const exportToCsv = (data, filename) => {
    // Create CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((item) => item.email).join("\n");

    // Encode URI
    const encodedUri = encodeURI(csvContent);

    // Create a temporary link element
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const handleCsvExport = () => {
    exportToCsv(TABLE_ROWS, "sethu.ai student emails.csv");
  };

  const handleParticularStudentSubmit = async (e) => {
    e.preventDefault();

    console.log("pass");
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">Batch Details</p>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <p className="font-myriad font-light text-lg">
              Batch name:{" "}
              <span className="font-ddin font-semibold">Batch 1</span>
            </p>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleAssignmentForParticularStudent}
                className="normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-2 px-5"
              >
                Assgn. for Particular Students
              </Button>
              <Button
                onClick={handleAssignmentForAll}
                className="normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-2 px-5"
              >
                Assgn. for All
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-2xl mt-5 font-ddin font-semibold">
              Student list
            </p>
            <Button
              onClick={handleCsvExport}
              className="normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-2 px-5"
            >
              Export to CSV
            </Button>
          </div>
        </div>

        <Card className="h-fit w-full box-shadow mt-1">
          <CardBody className="overflow-auto px-0 py-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {ADMIN_BATCH_STUDENTLIST_TABLE_HEAD.map((head) => (
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
                {TABLE_ROWS.map(({ name, email, education, phone }, index) => {
                  // const rowData = {
                  //   name,
                  //   email,
                  //   education,
                  //   phone,
                  // };
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4 font-ddin"
                    : "p-4 border-b border-blue-gray-50 font-ddin";

                  return (
                    <tr key={name} className="hover:bg-[#f0eeee]">
                      <td className={classes}>
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          //   onClick={() => handleRowClick(rowData)}
                        >
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-ddin text-base"
                            >
                              {name}
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
                          {email}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>

      <AssignAssignementModal
        open={modal.all_students}
        close={() => setModal({ ...modal, all_students: false })}
      />

      {/* bottom sheet for particular student */}
      <BottomSheet
        open={modal.particular_statudents}
        className="z-[9999999] relative"
        onDismiss={() =>
          setModal({
            ...modal,
            particular_statudents: false,
            all_students: false,
          })
        }
        skipInitialTransition
        defaultSnap={({ maxHeight }) => maxHeight / 1}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight / 4,
          maxHeight * 0.6,
        ]}
      >
        <div className="px-5 md:px-10 pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4">
            <p className="font-bold text-xl sm:text-2xl font-ddin">
              Select a students
            </p>
            <div className="relative sm:mt-3">
              <Input
                type="text"
                accessKey="s"
                label="Type Alt+S to search"
                className="w-60"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
              />
            </div>
          </div>

          <form onSubmit={handleParticularStudentSubmit}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 15 }).map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-100 rounded-xl hover:shadow-md transition-all flex justify-between items-center"
                >
                  <Checkbox
                    color="blue"
                    label={`Student ${i + 1}`}
                    labelProps={{
                      className: "font-ddin text-black font-normal",
                    }}
                    // required
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end items-center mt-3">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 px-12 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </BottomSheet>
    </>
  );
}

export default AdminBatchDetails;
