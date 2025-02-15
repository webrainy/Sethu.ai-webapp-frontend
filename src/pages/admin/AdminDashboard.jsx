import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { lineChartData, lineChartOptions } from "../../utils/charts";
import ReactApexChart from "react-apexcharts";
import profile from "../../assets/profilepic.jpg";
import moment from "moment";
import { IoVideocam } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { listEventItem } from "../../redux/eventSlice";

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
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_admin_access_token");
  const { event_items, loading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(
      listEventItem({
        end_point: `/api/event/list?order=1&limit=10`,
        access_token: access_token,
      })
    );
  }, [dispatch]);

  return (
    <div>
      {!loading ? (
        <>
          {event_items.length > 0 && (
            <div className="mx-3 bg-white px-4 py-3 rounded-2xl">
              <p className="font-ddin font-semibold text-3xl">
                Recent Events & Interviews
              </p>
              <div className="grid lg:grid-cols-2 gap-3 items-center mt-2">
                {event_items.map((event, i) => (
                  <div
                    key={i}
                    className="bg-white px-4 py-3 rounded-xl hover:shadow-md border"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-ddin text-xl font-semibold capitalize">
                        {event.title}
                      </p>
                      <p className="font-myriad text-sm font-light text-gray-600">
                        {/* Feb, 08 2025 12.00pm */}
                        {moment(event.datetime).format("LLL")}
                      </p>
                    </div>
                    <div className="flex justify-between items-end gap-4">
                      <div className="text-base font-myriad font-light">
                        <p>
                          Batch name:{" "}
                          <span className="font-semibold capitalize">
                            {event.batchInfo?.name}
                          </span>
                        </p>
                        <p>
                          Students name:{" "}
                          {event?.eventInfo
                            .map((info) => info.studentInfo.name)
                            .join(", ")}
                        </p>
                      </div>
                      <Button
                        onClick={() => window.open(event.url)}
                        className="flex items-center gap-2 shadow-none hover:shadow-none normal-case font-ddin font-medium text-base py-2 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        <IoVideocam />
                        Join URL
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="h-[50vh] flex justify-center items-center flex-col">
          <p className="text-3xl font-ddin font-semibold text-center">
            Loading...
          </p>
        </div>
      )}

      {/* <div className="flex flex-col md:flex-row gap-3 w-full rounded-2xl p-3">
        <div className="flex-[3]">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="bg-gradient-to-br from-[#fff] to-[#FFC324] shadow-lg text-black p-4 rounded-xl font-semibold flex-1 font-myriad">
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
              <Button className="flex items-center justify-center text-xs normal-case bg-transparent shadow-none hover:shadow-none text-[#606161] gap-0 py-3 px-0">
                See Statistics
                <MdKeyboardArrowRight className="text-xl" />
              </Button>
            </div>

            <div className="bg-gray-100 shadow-lg  p-4 rounded-xl flex-1 font-semibold font-myriad">
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
              <Button className="flex items-center justify-center text-xs normal-case bg-transparent shadow-none hover:shadow-none text-[#606161] gap-0 py-3 px-0">
                See Statistics
                <MdKeyboardArrowRight className="text-xl" />
              </Button>
            </div>
          </div>

          <div className="bg-white text-[#1C252E] rounded-2xl box-shadow py-6 shadow-md mt-3 px-2">
            <div className="px-3 mb-3">
              <Typography className="font-ddin font-semibold text-base md:text-xl">
                Total Batches
              </Typography>
              <Typography className="mb-1 font-myriad font-light text-sm text-[#637381]">
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

        <div className="flex-[2]">
          <div className="p-1">
            <h1 className="font-ddin font-semibold text-2xl capitalize">
              Total view performance
            </h1>
            <div className="mt-4 flex flex-col bg-white rounded-xl">
              {studentsData.map((student, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4 p-4">
                    <img
                      src={profile}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold font-ddin">
                        {student.name}
                      </p>
                      <p
                        className={`text-sm font-myriad font-light ${
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

                  {index !== studentsData.length - 1 && (
                    <hr className="border w-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AdminDashboard;
