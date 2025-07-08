import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ManageEventsModal from "../../components/modal/admin/ManageEventsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBatchItems,
  fetchBatchSelectedItems,
} from "../../redux/batchSlice";
import toast from "react-hot-toast";
import { IoVideocam } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { listEventItem, postEventItem } from "../../redux/eventSlice";
import moment from "moment";

function AdminManageEvents() {
  const [modal, setModal] = useState({ add: false, update: false });
  const [data, setData] = useState({
    title: "",
    url: "",
    batch_name: "",
    students: [],
    time: "",
    editable: false,
  });
  const dispatch = useDispatch();
  const { batch_items, selectedItems } = useSelector((state) => state.batch);
  const { event_items, loading } = useSelector((state) => state.event);
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: `/api/batch/list`,
        access_token: access_token,
      })
    ).unwrap();

    dispatch(
      listEventItem({
        end_point: `/api/event/list?event_type=1`,
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch]);

  const handleAddModal = () => {
    setModal({ ...modal, add: true });
    setData({
      ...data,
      title: "",
      url: "",
      batch_name: "",
      student_type: "",
      students: [],
      time: "",
      editable: false,
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFetchBatchDetails = async (batch_id) => {
    await dispatch(
      fetchBatchSelectedItems({
        end_point: `/api/batch/list?batch_id=${batch_id}`,
        access_token: access_token,
      })
    ).unwrap();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.batch_name) {
      alert("Please select a batch.");
    } else if (!data.student_type) {
      alert("Choose a student type.");
    } else {
      const urlencoded = new URLSearchParams();

      urlencoded.append("event_type", "1");
      urlencoded.append("title", data.title);
      urlencoded.append("url", data.url);
      urlencoded.append("datetime", data.time);
      urlencoded.append("batch_id", data.batch_name);
      if (data.student_type == 1) {
        for (let i = 0; i < selectedItems[0]?.students?.length; i++) {
          urlencoded.append(
            "student_id",
            selectedItems[0]?.students[i]?.student_id
          );
        }
      } else {
        for (let i = 0; i < data.students?.length; i++) {
          urlencoded.append("student_id", data.students[i]?.value);
        }
      }

      const result = await dispatch(
        postEventItem({
          end_point: `/api/event/create`,
          access_token: access_token,
          item_data: urlencoded,
        })
      ).unwrap();

      if (result.responseCode === 200) {
        toast.success("Event added successfully!");
        // console.log("ans",result);
        
        setModal({ ...modal, add: false });
        dispatch(
          listEventItem({
            end_point: `/api/event/list?event_type=1`,
            access_token: access_token,
          })
        ).unwrap();
      } else {
        toast.error(
          result.responseMessage || "Connection failed. Please try again."
        );
      }
    }
  };

  //   const handleUpdateModal = async (event_data) => {
  //     setModal({ ...modal, update: true });
  //     setData({
  //       ...data,
  //       title: "event 1",
  //       url: "http://localhost:3000/admin/manage_events",
  //       batch_name: "test 1",
  //       student_type: "1",
  //       students: [],
  //       time: "",
  //       editable: true,
  //     });
  //   };

  //   const handleEventDelete = async (event_data) => {
  //     if (window.confirm("Do you want to delete this event?")) {
  //       console.log(event_data);
  //     }
  //   };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">
            Manage Event/Classes
          </p>

          <Button
            onClick={handleAddModal}
            className="shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
          >
            Create Event
          </Button>
        </div>

        {/* <div className="flex justify-end items-center mt-4">
          <div className="w-72">
            <Input
              type="text"
              accessKey="s"
              label="Type Alt+S to search"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              // onChange={handleStudentSearch}
            />
          </div>
        </div> */}

        {!loading ? (
          <>
            {event_items.length > 0 ? (
              <div className="flex flex-col gap-3 mt-4">
                {event_items.map((event, i) => (
                  <div
                    key={i}
                    className="bg-white px-4 py-3 rounded-xl hover:shadow-md"
                  >
                    {/* <div className="flex justify-end items-center gap-3 mb-2">
                <LuPencil
                  className="text-lg cursor-pointer"
                  onClick={() => handleUpdateModal(event)}
                />
                <MdOutlineDeleteForever
                  className="text-2xl cursor-pointer"
                  onClick={() => handleEventDelete(event)}
                />
              </div> */}
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-ddin text-xl font-semibold capitalize">
                        {event.title}
                      </p>
                      <p className="font-myriad text-sm font-light text-gray-600">
                        {/* Feb, 08 2025 12.00pm */}
                        {/* {moment(event.datetime).format("LLL")} */}
                        {moment(event.datetime).format("LL")}
                      </p>
                    </div>
                    <div className="flex justify-between items-end gap-4">
                      <div className="text-base font-myriad font-light">
                        <p>
                          Batch name:{" "}
                          <span className="font-semibold capitalize">
                            {event.batchInfo?.name}
                          </span>
                        </p>
                        <p>
                          Students name:{" "}
                          {event?.eventInfo
                            .map((info) => info.student.name)
                            .join(", ")}
                        </p>
                        <p>Added by: {event?.createdBy?.name || "-"}</p>
                      </div>
                      <Button
                        onClick={() => window.open(event.url)}
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

      <ManageEventsModal
        open={modal.add}
        close={() => setModal({ ...modal, add: false })}
        data={data}
        setData={setData}
        batch_items={batch_items}
        handleChange={handleChange}
        handleFetchBatchDetails={handleFetchBatchDetails}
        selectedItems={selectedItems}
        handleSubmit={handleSubmit}
      />
      <ManageEventsModal
        open={modal.update}
        close={() => setModal({ ...modal, update: false })}
        data={data}
        setData={setData}
        batch_items={batch_items}
        handleChange={handleChange}
        handleFetchBatchDetails={handleFetchBatchDetails}
        selectedItems={selectedItems}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AdminManageEvents;
