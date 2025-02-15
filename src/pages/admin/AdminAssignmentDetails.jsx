import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Assignment_Table_Head } from "../../utils/constants";
import {
  fetchAssignment,
  updateAssignmentStatus,
} from "../../redux/assignmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ManageAssignStatusModal from "../../components/modal/admin/ManageAssignStatusModal";
import toast from "react-hot-toast";

function AdminAssignmentDetails() {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_admin_access_token");
  const { assignment_list, student_info } = useSelector(
    (state) => state.assignment
  );
  const location = useLocation().state;
  const [modal, setModal] = useState({ status_update: false });
  const [data, setData] = useState({ compl_status: "", assign_id: "" });

  useEffect(() => {
    dispatch(
      fetchAssignment({
        end_point: `/api/assign/student?student_id=${location.student_id}`,
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

  const handleStatusUpdateModal = (assgn_data) => {
    setModal({ ...modal, status_update: true });
    setData({
      ...data,
      compl_status: assgn_data.compl_status,
      assign_id: assgn_data.assign_id,
    });
  };

  const handleChange = (e) => {
    setData({ ...data, compl_status: e });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateAssignmentStatus({
        end_point: `/api/assign/status?assign_id=${data.assign_id}`,
        access_token: access_token,
        assgn_data: { compl_status: data.compl_status },
      })
    ).unwrap();
    if (result.responseCode === 200) {
      toast.success("Assignment status updated.");
      setModal({ ...modal, status_update: false });
      dispatch(
        fetchAssignment({
          end_point: `/api/assign/student?student_id=${location.student_id}`,
          access_token: access_token,
        })
      ).unwrap();
    } else {
      toast.error(
        result.responseMessage || "Connection failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="p-3">
        <div>
          <p className="text-3xl font-ddin font-semibold">Manage Batch</p>
          <p className="font-myriad font-light text-lg">
            Student Name:{" "}
            <span className="font-ddin font-semibold capitalize">
              {location?.name || ""}
            </span>
          </p>
          <p className="font-myriad font-light text-lg">
            Batch Name:{" "}
            <span className="font-ddin font-semibold capitalize">
              {student_info[0]?.batchInfo?.name || ""}
            </span>
          </p>
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
                    <th className={`bg-[#e9e6e6] p-4`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-70 font-ddin"
                      >
                        {""}
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assignment_list.length > 0 ? (
                    assignment_list.map((assignment, index) => {
                      const { assignmentInfo, compl_status } = assignment;
                      const { title, description, url, createdBy } =
                        assignmentInfo || {};
                      const statusData = getStatusData(compl_status);
                      const isLast = index === assignment_list.length - 1;
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
                          <td className={classes}>
                            <div className="flex items-center gap-3 cursor-pointer justify-end">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal font-ddin"
                              >
                                {createdBy?.name || "-"}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex gap-3 justify-end items-center cursor-pointer">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold font-myriad text-[#E68242]"
                                onClick={() =>
                                  handleStatusUpdateModal(assignment)
                                }
                              >
                                Update status
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
      </div>

      <ManageAssignStatusModal
        open={modal.status_update}
        close={() => setModal({ ...modal, status_update: false })}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AdminAssignmentDetails;
