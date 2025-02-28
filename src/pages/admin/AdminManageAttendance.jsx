import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Option,
  Select,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBatchItems,
  fetchBatchSelectedItems,
} from "../../redux/batchSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ATTENDANCE_TAB_DATA } from "../../utils/constants";

function AdminManageAttendance() {
  const [currentTime, setCurrentTime] = useState("");
  const [data, setData] = useState({
    batch: "",
    student: "",
    attendance_value: 0,
  });
  const [activeTab, setActiveTab] = useState("1");
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("sethu_admin_access_token");
  const { batch_items, selectedItems, loading } = useSelector(
    (state) => state.batch
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: "/api/batch/list",
        access_token: access_token,
      })
    ).unwrap();

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const fetchBatchStudentList = (batch) => {
    dispatch(
      fetchBatchSelectedItems({
        end_point: `/api/batch/list?batch_id=${batch}`,
        access_token: access_token,
      })
    ).then((response) => {
      const students = response.payload?.responseData?.[0]?.students || [];
      const defaultAttendanceStatus = students.reduce((acc, student) => {
        acc[student.student_id] = 0;
        return acc;
      }, {});
      setAttendanceStatus(defaultAttendanceStatus);
    });
  };

  const handleSelectAllAttendance = () => {
    const newAttendanceStatus = { ...attendanceStatus };
    const allSelected = Object.values(newAttendanceStatus).every(
      (value) => value === 1
    );

    Object.keys(newAttendanceStatus).forEach((student_id) => {
      newAttendanceStatus[student_id] = allSelected ? 0 : 1;
    });

    setAttendanceStatus(newAttendanceStatus);
  };

  const handleCheckboxChange = (student_id, checked) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [student_id]: checked ? 1 : 0,
    }));
  };

  const handleSubmit = () => {
    const attendanceData = Object.keys(attendanceStatus).map((student_id) => ({
      student_id: student_id,
      attendance_value: attendanceStatus[student_id],
    }));

    // Send the data to the backend
    console.log("Attendance Data to Submit:", attendanceData, activeTab);
  };

  const handleViewAttendance = () => {
    navigate("/admin/attendance/view_attendance");
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">Manage Attendance</p>

          <Button
            onClick={handleViewAttendance}
            className="shadow-none hover:shadow-none py-2 capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
          >
            View Attendance
          </Button>
        </div>

        <div className="mt-3 grid md:grid-cols-3">
          <Select
            label="Select a Batch"
            containerProps={{
              className: "font-ddin",
            }}
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            onChange={(value) => {
              fetchBatchStudentList(value);
              setData({ ...data, batch: value });
            }}
          >
            {batch_items.map((batch, i) => (
              <Option
                key={batch.batch_id}
                style={{ fontFamily: "D-DIN" }}
                value={batch.batch_id}
              >
                {batch.name}
              </Option>
            ))}
          </Select>
        </div>

        {data.batch && (
          <div className="mt-4">
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                {ATTENDANCE_TAB_DATA.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={`${
                      activeTab === value ? "text-gray-900" : ""
                    } font-myriad font-semibold`}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {ATTENDANCE_TAB_DATA.map(({ value, desc }) => (
                  <TabPanel key={value} value={value} className="px-0">
                    <div className="!flex justify-end items-center font-ddin">
                      {moment().format("ll") + " - " + currentTime}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <p className="font-ddin text-3xl font-semibold text-gray-900">
                        Students
                      </p>
                      {selectedItems?.[0]?.students?.length > 0 && (
                        <Button
                          type="button"
                          onClick={handleSelectAllAttendance}
                          className={`shadow-none hover:shadow-none normal-case font-ddin text-sm outline-none ${
                            Object.values(attendanceStatus).every(
                              (value) => value === 1
                            )
                              ? "bg-red-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {Object.values(attendanceStatus).every(
                            (value) => value === 1
                          )
                            ? "Deselect all"
                            : "Select all"}
                        </Button>
                      )}
                    </div>

                    {!loading ? (
                      <div>
                        {selectedItems?.[0]?.students?.length > 0 ? (
                          <Card className="h-fit w-full box-shadow mt-3">
                            <CardBody className="overflow-auto px-0 py-0">
                              <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                  <tr>
                                    {["Student Name", "Attendance"].map(
                                      (head) => (
                                        <th
                                          key={head}
                                          className=" bg-[#e9e6e6] p-4"
                                        >
                                          <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold leading-none opacity-70 font-ddin"
                                          >
                                            {head}
                                          </Typography>
                                        </th>
                                      )
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedItems?.[0]?.students?.map(
                                    (student, index) => {
                                      const isLast =
                                        index ===
                                        selectedItems?.[0]?.student?.length - 1;
                                      const classes = isLast
                                        ? "px-4 py-1 font-ddin"
                                        : "px-4 py-1 border-b border-blue-gray-50 font-ddin";

                                      return (
                                        <tr
                                          key={index}
                                          className="hover:bg-[#f0eeee]"
                                        >
                                          <td className={classes}>
                                            <Typography
                                              variant="small"
                                              color="blue-gray"
                                              className="font-semibold font-ddin text-base"
                                            >
                                              {student.name}
                                            </Typography>
                                          </td>
                                          <td className={classes}>
                                            <Checkbox
                                              color="blue"
                                              checked={
                                                attendanceStatus[
                                                  student.student_id
                                                ] === 1
                                              }
                                              onChange={(e) =>
                                                handleCheckboxChange(
                                                  student.student_id,
                                                  e.target.checked
                                                )
                                              }
                                            />
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
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
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>

            {selectedItems?.[0]?.students?.length > 0 && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  className="bg-blue-500 font-ddin font-semibold normal-case text-base outline-none shadow-none hover:shadow-none"
                  onClick={handleSubmit}
                >
                  Submit Attendance
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminManageAttendance;
