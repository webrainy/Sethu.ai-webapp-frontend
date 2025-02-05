import React, { useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Assignment_Table_Head } from "../../utils/constants";
import { fetchAssignment } from "../../redux/assignmentSlice";
import { useDispatch, useSelector } from "react-redux";

function StudentBatchAssignments() {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_student_access_token");

  const { assignment_list, student_info, assgn_loading } = useSelector(
    (state) => state.assignment
  );

  useEffect(() => {
    dispatch(
      fetchAssignment({
        end_point: `/api/assign/student`,
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch]);

  const getStatusData = (statusNumber) => {
    return statusNumber === 1
      ? { text: "Pending", classes: "text-red-600 bg-red-100" }
      : statusNumber === 2
      ? { text: "Completed", classes: "text-green-600 bg-green-100" }
      : statusNumber === 3
      ? { text: "Rejected", classes: "text-gray-700 bg-gray-200" }
      : "";
  };

  return (
    <div className="p-3">
      <div className="gap-5 space-y-3">
        <p className="text-3xl font-ddin font-semibold">
          Hi,{" "}
          <span className="text-[#FF9D23]">{student_info[0]?.name || "-"}</span>
        </p>
        <h1 className="text-xl font-myriad font-semibold">
          This isn't just a batch, it's a legacy. Welcome to{" "}
          <span className="text-[#FF9D23]">
            {student_info[0]?.batchInfo?.name || "-"}!
          </span>
        </h1>
      </div>
      {!assgn_loading ? (
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
                  {assignment_list?.length > 0 ? (
                    assignment_list.map((assignment, index) => {
                      const { assignmentInfo, compl_status } = assignment;
                      const { title, description, url } = assignmentInfo || {};
                      const statusData = getStatusData(compl_status);
                      const isLast = index === assignment_list?.length - 1;
                      const classes = isLast
                        ? "px-4 py-4 font-ddin"
                        : "px-4 py-4 border-b border-blue-gray-50 font-ddin";

                      return (
                        <tr
                          key={assignment.assign_id || index}
                          className="hover:bg-[#f0eeee]"
                        >
                          <td className={classes}>
                            <div className="flex items-start flex-col gap-1">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold font-ddin"
                              >
                                {title || "No Title"}
                              </Typography>
                              <Typography
                                variant="small"
                                className="font-myriad font-light"
                              >
                                {description}
                              </Typography>
                              {url && (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#DD4633] text-base hover:underline"
                                >
                                  Click here to check it out!
                                </a>
                              )}
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center gap-3 cursor-pointer justify-end">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className={`border rounded-xl border-gray-300 px-4 py-[2px] text-[13px] ${statusData.classes}`}
                              >
                                {statusData.text}
                              </Typography>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        className="px-4 py-4"
                        colSpan={Assignment_Table_Head.length}
                      >
                        <Typography
                          variant="small"
                          className="font-ddin text-center"
                        >
                          No assignments found.
                        </Typography>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
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

export default StudentBatchAssignments;
