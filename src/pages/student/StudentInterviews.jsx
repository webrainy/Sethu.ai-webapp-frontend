import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { IoVideocam } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignment } from "../../redux/assignmentSlice";
import moment from "moment";

function StudentInterviews() {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_student_access_token");
  const { events_list, assgn_loading, student_info } = useSelector(
    (state) => state.assignment
  );

  useEffect(() => {
    dispatch(
      fetchAssignment({
        end_point: `/api/event/student?event_type=2`,
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch]);

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">Interviews</p>
        </div>

        {!assgn_loading ? (
          <>
            {events_list?.length > 0 ? (
              <div className="flex flex-col gap-3 mt-4">
                {events_list?.map((interview, i) => (
                  <div
                    key={i}
                    className="bg-white px-4 py-3 rounded-xl hover:shadow-md"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-ddin text-xl font-semibold">
                        {interview.eventInfo?.title}
                      </p>
                      <p className="font-myriad text-sm font-light text-gray-600">
                        {/* Feb, 08 2025 12.00pm */}
                        {moment(interview.eventInfo?.datetime).format("LLL")}
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
                      </div>
                      <Button
                        onClick={() => window.open(interview.eventInfo?.url)}
                        className="flex items-center gap-2 shadow-none hover:shadow-none normal-case font-ddin font-medium text-base py-2 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        <IoVideocam />
                        Join URL
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[50vh] flex justify-center items-center flex-col">
                <p className="text-3xl font-ddin font-semibold text-center">
                  No result found
                </p>
                <p className="font-myriad font-light text-center text-gray-700">
                  Add some items to cheer it up
                </p>
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
    </>
  );
}

export default StudentInterviews;
