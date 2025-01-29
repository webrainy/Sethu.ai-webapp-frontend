import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { lineChartData, lineChartOptions } from "../../utils/charts";
import ReactApexChart from "react-apexcharts";
import profile from "../../assets/profilepic.jpg";

const studentsData = [
  {
    name: "John Doe",
    assignmentCompletedState: true,
  },
  {
    name: "Jane Smith",
    assignmentCompletedState: false,
  },
  {
    name: "Mark Taylor",
    assignmentCompletedState: true,
  },
  {
    name: "Emily Johnson",
    assignmentCompletedState: false,
  },
  {
    name: "David Williams",
    assignmentCompletedState: true,
  },
];

function AdminDashboard() {
  console.log(studentsData);

  return (
    <div>
      <div className="flex gap-5 w-full rounded-2xl shadow-md p-3">
        <div className="flex-[3] space-y-5">
          <div className="flex gap-5">
          <div className="bg-gradient-to-br from-[#FFC324] to-white shadow-lg text-black p-4 rounded-xl font-semibold flex-1">
              <h1 className="text-sm flex items-center gap-2 pt-3 pb-3">
                <span className="w-2 h-2 rounded-full bg-red-800 shadow-[0px_4px_8px_rgba(270,73,73,1)]"></span>
                Update
              </h1>
              <p className="text-[#606161] text-xs">Jan 27th 2025</p>
              <p>
                Driving Success for{" "}
                <span className="text-green-900 text-base">300 </span>
                Learners!
              </p>
              <Button
                className="flex items-center justify-center text-xs normal-case bg-transparent shadow-none hover:shadow-none text-[#606161] gap-0 py-3 px-0"
                style={{ fontFamily: "afacad" }}
              >
                See Statistics
                <MdKeyboardArrowRight className="text-xl" />
              </Button>
            </div>

            <div className="bg-gray-100 shadow-lg  p-4 rounded-xl border-gray-400 border-[0.5px] flex-1">
              <h1 className="text-xl flex items-center gap-2 pt-3 pb-3 font-semibold">
                A Snapshot of 15 Active Batches!
              </h1>
              <p className="text-[#606161] text-xs">Jan 27th 2025</p>
              <Button
                className="flex items-center justify-center text-xs normal-case bg-transparent shadow-none hover:shadow-none text-[#606161] gap-0 py-3 px-0"
                style={{ fontFamily: "afacad" }}
              >
                See Statistics
                <MdKeyboardArrowRight className="text-xl" />
              </Button>
            </div>
          </div>
          <div className="bg-gray-100  p-4 rounded-xl border-gray-400 border-[0.5px] flex-1">
            <div className="dashboard-card22 grow-0 basis-auto">
              <div className="bg-white text-[#1C252E] rounded-2xl box-shadow py-6 px-3">
                <div className="px-3 mb-3">
                  <Typography className="font-publicsans font-semibold text-base md:text-xl">
                    Total Batches
                  </Typography>
                  <Typography className="mb-1 font-publicsans font-normal text-sm text-[#637381]">
                    (+43%) than last year
                  </Typography>
                </div>
                <ReactApexChart
                  options={lineChartOptions}
                  series={lineChartData}
                  type="area"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[2]">
          <div className="bg-gray-100 p-4 rounded-lg row-span-2">
            <h1>Total view performance</h1>
            <div className="border-t border-gray-300 my-2 w-full"></div>
            <div className="space-y-4 mt-4">
              {studentsData.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={profile}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold">{student.name}</p>
                    <p
                      className={`text-sm ${
                        student.assignmentCompletedState
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {student.assignmentCompletedState
                        ? "Completed"
                        : "Not Completed"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
