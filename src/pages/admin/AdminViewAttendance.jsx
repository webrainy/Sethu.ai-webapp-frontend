import {
  Breadcrumbs,
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
import { Link } from "react-router-dom";
import { fetchBatchItems } from "../../redux/batchSlice";
import { ATTENDANCE_TAB_DATA } from "../../utils/constants";
import { fetchAttendanceList } from "../../redux/attendanceSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function AdminViewAttendance() {
  const [data, setData] = useState({
    batch: "",
  });
  const [filterDate, setFilterDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  const { attendance_list, loading } = useSelector((state) => state.attendance);
  const { batch_items } = useSelector((state) => state.batch);
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: "/api/batch/list",
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch, activeTab]);

  const fetchStudentAttendanceList = (batch) => {
    dispatch(
      fetchAttendanceList({
        end_point: `/api/attendance/list?batch_id=${batch}&date=${moment(
          filterDate
        ).format("YYYY-MM-DD")}`,
        access_token: access_token,
      })
    );
  };

  const fetchFilterStudentAttendanceList = (date) => {
    if (data.batch.length > 0) {
      dispatch(
        fetchAttendanceList({
          end_point: `/api/attendance/list?batch_id=${data.batch}&date=${moment(
            date
          ).format("YYYY-MM-DD")}`,
          access_token: access_token,
        })
      );
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-ddin font-semibold">View Attendance</p>
            <Breadcrumbs>
              <Link to={-1} className="opacity-60 font-ddin">
                Manage Attendance
              </Link>
              <Link to="#" className="opacity-60 font-ddin">
                View Attendance
              </Link>
            </Breadcrumbs>
          </div>
        </div>

        <div className="mt-3 grid md:grid-cols-3">
          <Select
            label="Select a Batch"
            containerProps={{
              className: "font-ddin",
            }}
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            onChange={(value) => {
              fetchStudentAttendanceList(value);
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
          <div></div>

          <div className="flex items-center justify-end">
            <DatePicker
              selected={filterDate}
              onChange={(date) => {
                setFilterDate(date);
                fetchFilterStudentAttendanceList(date);
              }}
              value={filterDate}
              maxDate={new Date()}
              dateFormat={"dd/MM/YYYY"}
              placeholderText="Select a Date"
              className="bg-[#F5F7F9] ml-4 px-5 py-2 outline-none border-none rounded-lg drop-shadow-lg font-normal text-base font-ddin"
            />
          </div>
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
                {ATTENDANCE_TAB_DATA.map(({ value, desc }) => {
                  // Filter responseData based on attendance_type
                  const filteredData = attendance_list?.filter(
                    (attendance) => attendance.attendance_type == value
                  );

                  return (
                    <TabPanel key={value} value={value} className="px-0">
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-ddin text-3xl font-semibold text-gray-900">
                          Students
                        </p>
                      </div>

                      {!loading ? (
                        <div>
                          {filteredData?.length > 0 ? (
                            <Card className="h-fit w-full box-shadow mt-3">
                              <CardBody className="overflow-auto px-0 py-0">
                                <table className="w-full min-w-max table-auto text-left">
                                  <thead>
                                    <tr>
                                      <th className=" bg-[#e9e6e6] p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-semibold leading-none opacity-70 font-ddin"
                                        >
                                          Student Name
                                        </Typography>
                                      </th>

                                      {/* Dynamically generate headers based on datetime */}
                                      {filteredData?.map((attendance) => (
                                        <th
                                          key={attendance.attendance_id}
                                          className="bg-[#e9e6e6] p-4"
                                        >
                                          <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold leading-none opacity-70 font-ddin"
                                          >
                                            {new Date(
                                              attendance.datetime
                                            ).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </Typography>
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Object.values(
                                      filteredData.reduce((acc, attendance) => {
                                        attendance.attendanceInfo.forEach(
                                          (info) => {
                                            if (
                                              !acc[info.studentInfo.student_id]
                                            ) {
                                              acc[info.studentInfo.student_id] =
                                                {
                                                  studentInfo: info.studentInfo,
                                                  attendanceStatus: {},
                                                };
                                            }
                                            acc[
                                              info.studentInfo.student_id
                                            ].attendanceStatus[
                                              attendance.attendance_id
                                            ] = info.attendance_status;
                                          }
                                        );
                                        return acc;
                                      }, {})
                                    ).map((student) => (
                                      <tr
                                        key={student.studentInfo.student_id}
                                        className="hover:bg-[#f0eeee]"
                                      >
                                        <td className="px-4 py-1 border-b border-blue-gray-50 font-ddin">
                                          <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold font-ddin text-base"
                                          >
                                            {student?.studentInfo?.name}
                                          </Typography>
                                        </td>

                                        {/* Dynamically generate checkboxes based on attendance status */}
                                        {filteredData.map((attendance) => (
                                          <td
                                            key={attendance.attendance_id}
                                            className="px-4 py-1 border-b border-blue-gray-50 font-ddin"
                                          >
                                            <Checkbox
                                              className="disabled:opacity-100"
                                              color="blue"
                                              checked={
                                                student.attendanceStatus[
                                                  attendance.attendance_id
                                                ] === 1
                                              }
                                              onChange={(e) =>
                                                e.preventDefault()
                                              }
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
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
                  );
                })}
              </TabsBody>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminViewAttendance;
