import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ADMIN_BATCH_STUDENTLIST_TABLE_HEAD } from "../../utils/constants";
import AssignAssignementModal from "../../components/modal/student/AssignAssignementModal";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatchSelectedItems } from "../../redux/batchSlice";
import { postAssignmentToStudent } from "../../redux/assignmentSlice";
import toast from "react-hot-toast";

function AdminBatchDetails() {
  const [modal, setModal] = useState({
    all_students: false,
    particular_statudents_bottom_sheet: false,
    particular_student_modal: false,
  });
  const [data, setData] = useState({
    assgn_name: "",
    assgn_desc: "",
    assgn_url: "",
    student_list: [],
  });
  const location = useLocation().state;
  const dispatch = useDispatch();
  const { loading, selectedItems } = useSelector((state) => state.batch);
  const { assgn_loading } = useSelector((state) => state.assignment);
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      fetchBatchSelectedItems({
        end_point: `/api/batch/list?batch_id=${location.item?.batch_id}`,
        access_token: access_token,
      })
    );
  }, [dispatch]);

  const handleAssignmentForAll = () => {
    const allStudentIds = selectedItems[0]?.students?.map(
      (student) => student.student_id
    );
    setModal({ ...modal, all_students: true });
    setData({
      ...data,
      assgn_name: "",
      assgn_desc: "",
      assgn_url: "",
      student_list: allStudentIds,
    });
  };

  const handleAssignmentForParticularStudent = () => {
    setModal({ ...modal, particular_statudents_bottom_sheet: true });
    setData({
      ...data,
      assgn_name: "",
      assgn_desc: "",
      assgn_url: "",
      student_list: [],
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCheckParticularStudentChange = (student_id, isChecked) => {
    setData((prevData) => ({
      ...prevData,
      student_list: isChecked
        ? [...prevData.student_list, student_id] // Add student ID
        : prevData.student_list.filter((id) => id !== student_id), // Remove student ID
    }));
  };

  const handleStudentSearchChange = async (e) => {
    console.log(e.target.value);

    // const searchQuery = e.target.value.trim();

    // if (searchQuery?.length > 0) {
    //   dispatch()
    // }
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
    exportToCsv(selectedItems[0]?.students, "sethu.ai student emails.csv");
  };

  const handleParticularStudentSubmit = async (e) => {
    e.preventDefault();

    const urlencoded = new URLSearchParams();

    urlencoded.append("title", data.assgn_name);
    urlencoded.append("description", data.assgn_desc);
    urlencoded.append("url", data.assgn_url);
    urlencoded.append("batch_id", selectedItems[0]?.batch_id);
    urlencoded.append("exstng_assign", 2);
    for (let i = 0; i < data?.student_list?.length; i++) {
      urlencoded.append("student_id", data?.student_list[i]);
    }

    const result = await dispatch(
      postAssignmentToStudent({
        end_point: "/api/assign/create",
        access_token: access_token,
        assgn_data: urlencoded,
      })
    ).unwrap();

    if (result.responseCode === 200) {
      toast.success("Assignment assigned.");
      setModal({ ...modal, particular_student_modal: false });
      // dispatch(
      //   fetchBatchItems({
      //     end_point: "/api/batch/list",
      //     access_token: access_token,
      //   })
      // ).unwrap();
    } else {
      toast.error(
        result.responseMessage || "Connection failed. Please try again."
      );
    }
  };

  const handleAllStudentSubmit = async (e) => {
    e.preventDefault();

    const urlencoded = new URLSearchParams();

    urlencoded.append("title", data.assgn_name);
    urlencoded.append("description", data.assgn_desc);
    urlencoded.append("url", data.assgn_url);
    urlencoded.append("batch_id", selectedItems[0]?.batch_id);
    urlencoded.append("exstng_assign", 2);
    for (let i = 0; i < data?.student_list?.length; i++) {
      urlencoded.append("student_id", data?.student_list[i]);
    }

    const result = await dispatch(
      postAssignmentToStudent({
        end_point: "/api/assign/create",
        access_token: access_token,
        assgn_data: urlencoded,
      })
    ).unwrap();

    if (result.responseCode === 200) {
      toast.success("Assignment assigned.");
      setModal({ ...modal, all_students: false });
      // dispatch(
      //   fetchBatchItems({
      //     end_point: "/api/batch/list",
      //     access_token: access_token,
      //   })
      // ).unwrap();
    } else {
      toast.error(
        result.responseMessage || "Connection failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">Batch Details</p>
        </div>

        {!loading ? (
          <div>
            <div className="flex justify-between items-center">
              <p className="font-myriad font-light text-lg">
                Batch name:{" "}
                <span className="font-ddin font-semibold capitalize">
                  {selectedItems[0]?.name}
                </span>
              </p>

              {selectedItems[0]?.students?.length > 0 && (
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
              )}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-2xl mt-5 font-ddin font-semibold">
                Student list
              </p>
              {selectedItems[0]?.students?.length > 0 && (
                <Button
                  onClick={handleCsvExport}
                  className="normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-2 px-5"
                >
                  Export to CSV
                </Button>
              )}
            </div>

            {selectedItems[0]?.students?.length > 0 ? (
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
                      {selectedItems[0]?.students?.map((student, index) => {
                        const isLast =
                          index === selectedItems[0]?.students?.length - 1;
                        const classes = isLast
                          ? "p-4 font-ddin"
                          : "p-4 border-b border-blue-gray-50 font-ddin";

                        return (
                          <tr key={index} className="hover:bg-[#f0eeee]">
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
                                    {student.name}
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
                                {student.education}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal font-ddin"
                              >
                                {student.email}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal font-ddin"
                              >
                                {student.phone}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
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
          </div>
        ) : (
          <div className="h-[50vh] flex justify-center items-center flex-col">
            <p className="text-3xl font-ddin font-semibold text-center">
              Loading...
            </p>
          </div>
        )}
      </div>

      <AssignAssignementModal
        open={modal.all_students}
        close={() => setModal({ ...modal, all_students: false })}
        handleChange={handleChange}
        data={data}
        handleAllStudentSubmit={handleAllStudentSubmit}
        loading={assgn_loading}
      />
      <AssignAssignementModal
        open={modal.particular_student_modal}
        close={() => setModal({ ...modal, particular_student_modal: false })}
        handleChange={handleChange}
        data={data}
        handleParticularStudentSubmit={handleParticularStudentSubmit}
        loading={assgn_loading}
        modal={modal}
      />

      {/* bottom sheet for particular student */}
      <BottomSheet
        open={modal.particular_statudents_bottom_sheet}
        className="z-[9999999] relative"
        onDismiss={() =>
          setModal({
            ...modal,
            particular_statudents_bottom_sheet: false,
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
                onChange={(e) => handleStudentSearchChange(e)}
              />
            </div>
          </div>

          {selectedItems[0]?.students?.length > 0 ? (
            <form>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {selectedItems[0]?.students?.map((student, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-100 rounded-xl hover:shadow-md transition-all flex justify-between items-center"
                  >
                    <Checkbox
                      color="blue"
                      label={student.name}
                      labelProps={{
                        className: "font-ddin text-black font-normal",
                      }}
                      onChange={(e) =>
                        handleCheckParticularStudentChange(
                          student.student_id,
                          e.target.checked
                        )
                      }
                      // required
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center mt-3">
                <Button
                  type="button"
                  className="shadow-none hover:shadow-none disabled:cursor-not-allowed capitalize py-2 px-12 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
                  onClick={() =>
                    setModal({
                      ...modal,
                      particular_student_modal: true,
                      particular_statudents_bottom_sheet: false,
                    })
                  }
                  disabled={data.student_list.length > 0 ? false : true}
                >
                  Next
                </Button>
              </div>
            </form>
          ) : (
            <div className="h-[20vh] flex justify-center items-center flex-col">
              <p className="text-3xl font-ddin font-semibold text-center">
                No result found
              </p>
              <p className="font-myriad font-light text-center text-gray-700">
                Add some items to cheer it up
              </p>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}

export default AdminBatchDetails;
