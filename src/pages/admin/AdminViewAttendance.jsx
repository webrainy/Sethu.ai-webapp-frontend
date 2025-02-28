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

function AdminViewAttendance() {
  const [data, setData] = useState({
    batch: "",
  });
  //   const [tableHeadTitle, setTableHeadTable] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
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

          {/* <Button
            onClick={handleViewAttendance}
            className="shadow-none hover:shadow-none py-2 capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
          >
            View Attendance
          </Button> */}
        </div>

        <div className="mt-3 grid md:grid-cols-3">
          <Select
            label="Select a Batch"
            containerProps={{
              className: "font-ddin",
            }}
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            onChange={(value) => {
              //   fetchBatchStudentList(value);
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
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-ddin text-3xl font-semibold text-gray-900">
                        Students
                      </p>
                    </div>

                    {/* {!loading ? ( */}
                    <div>
                      {/* {selectedItems?.[0]?.students?.length > 0 ? ( */}
                      <Card className="h-fit w-full box-shadow mt-3">
                        <CardBody className="overflow-auto px-0 py-0">
                          <table className="w-full min-w-max table-auto text-left">
                            <thead>
                              <tr>
                                {["Student Name", "10.00 AM"].map((head) => (
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
                              {Array.from({ length: 5 }).map(
                                (student, index) => {
                                  const isLast =
                                    index ===
                                    Array.from({ length: 5 }).length - 1;
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
                                          test {student}
                                        </Typography>
                                      </td>
                                      <td className={classes}>
                                        <Checkbox
                                          className="disabled:opacity-100"
                                          color="blue"
                                          checked={true}
                                          onChange={(e) => e.preventDefault()}
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
                      {/* ) : (
                          <div className="h-[50vh] flex justify-center items-center flex-col">
                            <p className="text-3xl font-ddin font-semibold text-center">
                              No result found
                            </p>
                            <p className="font-myriad font-light text-center text-gray-700">
                              Add some items to cheer it up
                            </p>
                          </div>
                        )} */}
                    </div>
                    {/* ) : (
                      <div className="h-[50vh] flex justify-center items-center flex-col">
                        <p className="text-3xl font-ddin font-semibold text-center">
                          Loading...
                        </p>
                      </div>
                    )} */}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminViewAttendance;
