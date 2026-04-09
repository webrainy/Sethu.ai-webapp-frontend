import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  fetchAssignment,
  submitStudentAssignment,
} from "../../redux/assignmentSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function StudentBatchAssignments() {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_student_access_token");

  const { assignment_list, student_info, assgn_loading } = useSelector(
    (state) => state.assignment,
  );

  const [modal, setModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitData, setSubmitData] = useState({
    assignment_url: "",
    assignment_description: "",
    assignment_doc: [],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(
      fetchAssignment({
        end_point: `/api/assign/student`,
        access_token: access_token,
      }),
    ).unwrap();
  }, [dispatch]);

  const getStatusData = (statusNumber) => {
    if (statusNumber === 1)
      return { text: "Pending", classes: "text-red-600 bg-red-100" };
    if (statusNumber === 2)
      return { text: "Completed", classes: "text-green-600 bg-green-100" };
    if (statusNumber === 3)
      return { text: "Rejected", classes: "text-gray-700 bg-gray-200" };
    return { text: "", classes: "" };
  };

  const handleOpenSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmitData({
      assignment_url: "",
      assignment_description: "",
      assignment_doc: [],
    });
    setModal(true);
  };

  const handleFileChange = (e) => {
    setSubmitData({
      ...submitData,
      assignment_doc: Array.from(e.target.files),
    });
  };

  const handleSubmitAssignment = async () => {
    if (
      !submitData.assignment_url &&
      !submitData.assignment_description &&
      submitData.assignment_doc.length === 0
    ) {
      toast.error("Please provide at least a URL, description, or file.");
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append("assignment_url", submitData.assignment_url);
    formData.append(
      "assignment_description",
      submitData.assignment_description,
    );
    formData.append("assign_id", selectedAssignment?.assign_id);

    submitData.assignment_doc.forEach((file) => {
      formData.append("assignment_doc", file);
    });
    try {
      const result = await dispatch(
        submitStudentAssignment({
          end_point: "/api/student/assignment/create",
          access_token: access_token,
          data: formData,
        }),
      ).unwrap();
      if (result.responseCode === 200) {
        toast.success("Assignment submitted successfully!");
        setModal(false);
        dispatch(
          fetchAssignment({
            end_point: `/api/assign/student`,
            access_token: access_token,
          }),
        );
      } else {
        toast.error(result.responseMessage || "Submission failed. Try again.");
      }
    } catch (error) {
      toast.error("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
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
                    {["Assignments", "Status", "Action"].map((head, index) => (
                      <th
                        key={index}
                        className={`bg-[#e9e6e6] p-4 ${index === 2 ? "text-right" : ""}`}
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
                            <div className="flex items-center gap-3">
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
                            <div className="flex justify-end">
                              {compl_status === 1 || compl_status === 3 ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleOpenSubmit(assignment)}
                                  className={`normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-1 px-4 ${compl_status === 3 ? "bg-orange-500" : "bg-[#DD4633]"}`}
                                >
                                  {compl_status === 3 ? "Resubmit" : "Submit"}
                                </Button>
                              ) : compl_status === 2 ? (
                                <span className="text-sm font-ddin text-green-600 font-medium">
                                  ✓ Submitted
                                </span>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="px-4 py-4" colSpan={3}>
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

      <Dialog open={modal} handler={() => setModal(false)} size="md">
        <DialogHeader className="font-ddin">
          Submit Assignment
          {selectedAssignment?.assignmentInfo?.title && (
            <span className="text-sm font-myriad font-light text-gray-500 ml-2">
              — {selectedAssignment.assignmentInfo.title}
            </span>
          )}
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="Submission URL (GitHub / Drive / etc.)"
            value={submitData.assignment_url}
            onChange={(e) =>
              setSubmitData({ ...submitData, assignment_url: e.target.value })
            }
            containerProps={{ className: "font-ddin" }}
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
          />
          <Textarea
            label="Description"
            value={submitData.assignment_description}
            onChange={(e) =>
              setSubmitData({
                ...submitData,
                assignment_description: e.target.value,
              })
            }
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
          />
          <div>
            <p className="text-sm font-ddin text-gray-700 mb-1">
              Attach Files (PDF, DOC, etc.)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 font-ddin file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-ddin file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
            />
            {submitData.assignment_doc.length > 0 && (
              <p className="text-xs text-gray-500 mt-1 font-ddin">
                {submitData.assignment_doc.length} file(s) selected
              </p>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="outlined"
            onClick={() => setModal(false)}
            className="normal-case font-ddin shadow-none hover:shadow-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitAssignment}
            disabled={submitting}
            className="normal-case font-ddin shadow-none hover:shadow-none bg-[#DD4633]"
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default StudentBatchAssignments;
