import {
  Breadcrumbs,
  Card,
  CardBody,
  Checkbox,
  Option,
  Radio,
  Select,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBatchItems,
  fetchBatchSelectedItems,
} from "../../redux/batchSlice"; // ← ADDED fetchBatchSelectedItems
import { ATTENDANCE_TAB_DATA } from "../../utils/constants";
import {
  fetchAttendanceList,
  fetchPreviousAttendance,
} from "../../redux/attendanceSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import * as XLSX from "xlsx";

function AdminViewAttendance() {
  const [data, setData] = useState({ batch: "" });
  const [filterDate, setFilterDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("1");
  const [reportFilter, setReportFilter] = useState("all");
  const [showReport, setShowReport] = useState(false);

  const dispatch = useDispatch();
  const { attendance_list, previous_attendance, loading } = useSelector(
    (state) => state.attendance,
  );
  // ← ADDED selectedItems
  const { batch_items, selectedItems } = useSelector((state) => state.batch);
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: "/api/batch/list",
        access_token: access_token,
      }),
    ).unwrap();
  }, [dispatch, activeTab]);

  const fetchStudentAttendanceList = (batch) => {
    dispatch(
      fetchAttendanceList({
        end_point: `/api/attendance/list?batch_id=${batch}&date=${moment(
          filterDate,
        ).format("YYYY-MM-DD")}`,
        access_token: access_token,
      }),
    );
  };

  const fetchFilterStudentAttendanceList = (date) => {
    if (data.batch.length > 0) {
      dispatch(
        fetchAttendanceList({
          end_point: `/api/attendance/list?batch_id=${data.batch}&date=${moment(
            date,
          ).format("YYYY-MM-DD")}`,
          access_token: access_token,
        }),
      );
    }
  };

  const handleGenerateReport = () => {
    const previousDay = moment().subtract(1, "day").format("YYYY-MM-DD");
    dispatch(
      fetchPreviousAttendance({
        end_point: `/api/attendance/perviouslist?batch_id=${data.batch}&date=${previousDay}`,
        access_token: access_token,
      }),
    );
    setShowReport(true);
  };

  const buildStudentReport = () => {
    // Need both previous_attendance and full student list
    if (!selectedItems?.[0]?.students?.length)
      return { sessions: [], students: [] };

    const filteredByTab = (previous_attendance || []).filter(
      (att) => att.attendance_type == activeTab,
    );

    // Sessions = columns
    const sessions = filteredByTab.map((att) => ({
      attendance_id: att.attendance_id,
      time: moment.utc(att.datetime).utcOffset("+05:30").format("hh:mm A"),
    }));

    // Build student map from attendance records
    const studentMap = {};
    filteredByTab.forEach((attendance) => {
      attendance.attendanceInfo.forEach((info) => {
        const sid = info.studentInfo.student_id;
        if (!studentMap[sid]) {
          studentMap[sid] = {
            ...info.studentInfo,
            sessionStatus: {},
          };
        }
        studentMap[sid].sessionStatus[attendance.attendance_id] =
          info.attendance_status;
      });
    });

    // IMPORTANT: Add all batch students who have no attendance record (fully absent)
    selectedItems[0].students.forEach((student) => {
      if (!studentMap[student.student_id]) {
        studentMap[student.student_id] = {
          ...student,
          sessionStatus: {},
        };
        // Mark absent for all sessions
        sessions.forEach((session) => {
          studentMap[student.student_id].sessionStatus[session.attendance_id] =
            0;
        });
      }
    });

    let allStudents = Object.values(studentMap);

    if (reportFilter === "present") {
      allStudents = allStudents.filter((s) =>
        Object.values(s.sessionStatus).some((v) => v === 1),
      );
    } else if (reportFilter === "absent") {
      // Absent = all sessions absent OR no sessions at all
      allStudents = allStudents.filter(
        (s) =>
          Object.keys(s.sessionStatus).length === 0 ||
          Object.values(s.sessionStatus).every((v) => v !== 1),
      );
    }

    return { sessions, students: allStudents };
  };

  const { sessions: reportSessions, students: reportStudents } =
    buildStudentReport();

  const handleExportToExcel = () => {
    if (!reportStudents.length) return;

    const excelData = reportStudents.map((student) => {
      const row = {
        "Student Name": student.name,
        "Roll No.": student.rollno || "-",
        Email: student.email,
        Phone: student.phone,
      };

      reportSessions.forEach((session) => {
        row[session.time] =
          student.sessionStatus[session.attendance_id] === 1
            ? "Present"
            : "Absent";
      });

      row["Status"] = Object.values(student.sessionStatus).some((v) => v === 1)
        ? "Present"
        : "Absent";

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
    XLSX.writeFile(
      workbook,
      `Attendance_Report_${moment()
        .subtract(1, "day")
        .format("DD-MM-YYYY")}.xlsx`,
    );
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

        <div className="mt-3 grid md:grid-cols-3 gap-4">
          <Select
            label="Select a Batch"
            containerProps={{ className: "font-ddin" }}
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            onChange={(value) => {
              fetchStudentAttendanceList(value);
              setData({ ...data, batch: value });
              setShowReport(false);
              // ADDED: fetch full student list for absent detection
              dispatch(
                fetchBatchSelectedItems({
                  end_point: `/api/batch/list?batch_id=${value}`,
                  access_token: access_token,
                }),
              );
            }}
          >
            {batch_items.map((batch) => (
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
                setShowReport(false);
              }}
              value={filterDate}
              maxDate={new Date()}
              dateFormat={"dd/MM/yyyy"}
              placeholderText="Select a Date"
              className="bg-[#F5F7F9] ml-4 px-5 py-2 outline-none border-none rounded-lg drop-shadow-lg font-normal text-base font-ddin"
            />
          </div>
        </div>

        {/* Previous Day Report Section */}
        {data.batch && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <p className="font-ddin font-semibold text-lg">
                  Previous Day Attendance Report
                </p>
                <p className="font-myriad font-light text-gray-600 text-sm">
                  {moment().subtract(1, "day").format("dddd, MMMM Do YYYY")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {showReport && reportStudents.length > 0 && (
                  <Button
                    onClick={handleExportToExcel}
                    className="normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-2 px-5 bg-green-600"
                  >
                    Export to Excel
                  </Button>
                )}
                <Button
                  onClick={handleGenerateReport}
                  className="normal-case shadow-none hover:shadow-none font-ddin text-sm font-medium py-2 px-5 bg-[#DD4633]"
                >
                  Generate Absent Report
                </Button>
              </div>
            </div>

            {showReport && (
              <div className="mt-4">
                <div className="flex items-center gap-4 mb-3">
                  <p className="font-ddin font-semibold">Filter:</p>
                  {["all", "present", "absent"].map((opt) => (
                    <Radio
                      key={opt}
                      name="reportFilter"
                      label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                      labelProps={{ className: "font-ddin capitalize" }}
                      checked={reportFilter === opt}
                      onChange={() => setReportFilter(opt)}
                      color="blue"
                    />
                  ))}
                </div>

                {!loading ? (
                  reportStudents.length > 0 ? (
                    <Card className="h-fit w-full box-shadow">
                      <CardBody className="overflow-auto px-0 py-0">
                        <table className="w-full min-w-max table-auto text-left">
                          <thead>
                            <tr>
                              {[
                                "Student Name",
                                "Roll No.",
                                "Email",
                                "Phone",
                              ].map((head) => (
                                <th key={head} className="bg-[#e9e6e6] p-4">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold leading-none opacity-70 font-ddin"
                                  >
                                    {head}
                                  </Typography>
                                </th>
                              ))}
                              {reportSessions.map((session) => (
                                <th
                                  key={session.attendance_id}
                                  className="bg-[#e9e6e6] p-4"
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold leading-none opacity-70 font-ddin"
                                  >
                                    {session.time}
                                  </Typography>
                                </th>
                              ))}
                              <th className="bg-[#e9e6e6] p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold leading-none opacity-70 font-ddin"
                                >
                                  Status
                                </Typography>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportStudents.map((student, index) => {
                              const isLast =
                                index === reportStudents.length - 1;
                              const classes = isLast
                                ? "p-4 font-ddin"
                                : "p-4 border-b border-blue-gray-50 font-ddin";
                              const isPresent = Object.values(
                                student.sessionStatus,
                              ).some((v) => v === 1);
                              return (
                                <tr
                                  key={student.student_id}
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
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-ddin"
                                    >
                                      {student.rollno || "-"}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-ddin"
                                    >
                                      {student.email}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-ddin"
                                    >
                                      {student.phone}
                                    </Typography>
                                  </td>
                                  {reportSessions.map((session) => (
                                    <td
                                      key={session.attendance_id}
                                      className={classes}
                                    >
                                      <Checkbox
                                        className="disabled:opacity-100"
                                        color="blue"
                                        checked={
                                          student.sessionStatus[
                                            session.attendance_id
                                          ] === 1
                                        }
                                        onChange={(e) => e.preventDefault()}
                                      />
                                    </td>
                                  ))}
                                  <td className={classes}>
                                    <span
                                      className={`px-3 py-1 rounded-xl text-sm font-ddin border ${
                                        isPresent
                                          ? "text-green-600 bg-green-100 border-green-200"
                                          : "text-red-600 bg-red-100 border-red-200"
                                      }`}
                                    >
                                      {isPresent ? "Present" : "Absent"}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  ) : (
                    <div className="h-[20vh] flex justify-center items-center flex-col">
                      <p className="text-xl font-ddin font-semibold text-center text-gray-500">
                        No data found for previous day
                      </p>
                    </div>
                  )
                ) : (
                  <div className="h-[20vh] flex justify-center items-center">
                    <p className="text-xl font-ddin font-semibold">
                      Loading...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* View Attendance Table */}
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
                {ATTENDANCE_TAB_DATA.map(({ value }) => {
                  const filteredData = attendance_list?.filter(
                    (attendance) => attendance.attendance_type == value,
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
                                      <th className="bg-[#e9e6e6] p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-semibold leading-none opacity-70 font-ddin"
                                        >
                                          Student Name
                                        </Typography>
                                      </th>
                                      <th className="bg-[#e9e6e6] p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-semibold leading-none opacity-70 font-ddin"
                                        >
                                          Roll No.
                                        </Typography>
                                      </th>
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
                                            {moment
                                              .utc(attendance.datetime)
                                              .utcOffset("+05:30")
                                              .format("hh:mm A")}
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
                                          },
                                        );
                                        return acc;
                                      }, {}),
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
                                        <td className="px-4 py-1 border-b border-blue-gray-50 font-ddin">
                                          <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold font-ddin text-base"
                                          >
                                            {student?.studentInfo?.rollno ||
                                              "-"}
                                          </Typography>
                                        </td>
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
