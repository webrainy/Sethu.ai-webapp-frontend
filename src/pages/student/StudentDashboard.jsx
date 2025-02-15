import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignment } from "../../redux/assignmentSlice";
import moment from "moment";
import { IoVideocam } from "react-icons/io5";
import { Button } from "@material-tailwind/react";

function StudentDashboard() {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_student_access_token");
  const { events_list, assgn_loading, student_info } = useSelector(
    (state) => state.assignment
  );

  useEffect(() => {
    dispatch(
      fetchAssignment({
        end_point: `/api/event/student?order=1`,
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch]);

  return (
    <div>
      {!assgn_loading ? (
        <>
          {events_list?.length > 0 && (
            <div className="mx-3 bg-white px-4 py-3 rounded-2xl">
              <p className="font-ddin font-semibold text-3xl">Recent Events</p>
              <div className="grid lg:grid-cols-2 gap-3 items-center mt-2">
                {events_list?.map((event, i) => (
                  <div
                    key={i}
                    className="bg-white px-4 py-3 rounded-xl hover:shadow-md border"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-ddin text-xl font-semibold capitalize">
                        {event.eventInfo?.title}
                      </p>
                      <p className="font-myriad text-sm font-light text-gray-600">
                        {/* Feb, 08 2025 12.00pm */}
                        {moment(event.eventInfo?.datetime).format("LLL")}
                      </p>
                    </div>
                    <div className="flex justify-between items-end gap-4">
                      <div className="text-base font-myriad font-light">
                        <p>
                          Batch name:{" "}
                          <span className="font-semibold capitalize">
                            {student_info[0]?.batchInfo?.name}
                          </span>
                        </p>
                        {/* <p>
                          Students name:{" "}
                          {event?.eventInfo
                            .map((info) => info.studentInfo.name)
                            .join(", ")}
                        </p> */}
                      </div>
                      <Button
                        onClick={() => window.open(event.eventInfo?.url)}
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
    </div>
  );
}

export default StudentDashboard;
