import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ManageEventsModal from "../../components/modal/admin/ManageEventsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBatchItems,
  fetchBatchSelectedItems,
} from "../../redux/batchSlice";
import toast from "react-hot-toast";
import { IoVideocam } from "react-icons/io5";
import { listEventItem, postEventItem } from "../../redux/eventSlice";
import moment from "moment";

function AdminManageEvents() {
  const [modal, setModal] = useState({ add: false, update: false });
  const [viewEvent, setViewEvent] = useState(null);
  const [data, setData] = useState({
    title: "",
    url: "",
    batch_name: "",
    description: "",
    students: [],
    time: "",
    editable: false,
  });
  const [selectedBatchFilter, setSelectedBatchFilter] = useState("all");

  const dispatch = useDispatch();
  const { batch_items, selectedItems } = useSelector((state) => state.batch);
  const { event_items, loading } = useSelector((state) => state.event);
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const fetchEvents = (batch_id = "all") => {
    const endpoint =
      batch_id === "all"
        ? `/api/event/list?event_type=1`
        : `/api/event/list?event_type=1&batch_id=${batch_id}`;

    dispatch(
      listEventItem({
        end_point: endpoint,
        access_token: access_token,
      }),
    ).unwrap();
  };

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: `/api/batch/list`,
        access_token: access_token,
      }),
    ).unwrap();
    fetchEvents();
  }, [dispatch]);

  const handleBatchFilterChange = (e) => {
    const batch_id = e.target.value;
    setSelectedBatchFilter(batch_id);
    fetchEvents(batch_id);
  };

  const handleAddModal = () => {
    setModal({ ...modal, add: true });
    setData({
      ...data,
      title: "",
      url: "",
      batch_name: "",
      description: "",
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
      }),
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
      urlencoded.append("event_descriprion", data.description); // matches model typo
      urlencoded.append("datetime", data.time);
      urlencoded.append("batch_id", data.batch_name);
      if (data.student_type == 1) {
        for (let i = 0; i < selectedItems[0]?.students?.length; i++) {
          urlencoded.append(
            "student_id",
            selectedItems[0]?.students[i]?.student_id,
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
        }),
      ).unwrap();

      if (result.responseCode === 200) {
        toast.success("Event added successfully!");
        setModal({ ...modal, add: false });
        fetchEvents(selectedBatchFilter);
      } else {
        toast.error(
          result.responseMessage || "Connection failed. Please try again.",
        );
      }
    }
  };

  // Frontend filter as fallback in case backend filter isn't working
  const filteredEvents =
    selectedBatchFilter === "all"
      ? event_items
      : event_items.filter((e) => e.batch_id === selectedBatchFilter);

  return (
    <>
      <div className="p-3">
        {/* Header */}
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

        {/* Batch Filter */}
        <div className="flex items-center gap-2 mt-4">
          <label className="font-ddin font-medium text-sm text-gray-700 whitespace-nowrap">
            Filter by Batch:
          </label>
          <select
            value={selectedBatchFilter}
            onChange={handleBatchFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 font-myriad text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#DD4633] focus:border-transparent"
          >
            <option value="all">All Batches</option>
            {Array.isArray(batch_items) &&
              batch_items.map((batch) => (
                <option key={batch.batch_id} value={batch.batch_id}>
                  {batch.name}
                </option>
              ))}
          </select>
        </div>

        {/* Content */}
        {!loading ? (
          <>
            {filteredEvents.length > 0 ? (
              <div className="mt-4 overflow-x-auto border border-gray-200">
                <table className="w-full bg-white text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-ddin font-semibold text-gray-700">
                        Sl No
                      </th>
                      <th className="text-left px-4 py-3 font-ddin font-semibold text-gray-700">
                        Event Name
                      </th>
                      <th className="text-left px-4 py-3 font-ddin font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 font-ddin font-semibold text-gray-700">
                        Description
                      </th>
                      <th className="text-left px-4 py-3 font-ddin font-semibold text-gray-700">
                        Batch
                      </th>
                      <th className="text-left px-4 py-3 font-ddin font-semibold text-gray-700">
                        Added By
                      </th>
                      <th className="text-left px-4 py-3 font-ddin font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event, index) => {
                      const isLast = index === filteredEvents.length - 1;
                      const classes = isLast
                        ? "p-4 font-ddin"
                        : "p-4 border-b border-blue-gray-50 font-ddin";

                      return (
                        <tr key={index} className="hover:bg-[#f0eeee]">
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-ddin"
                            >
                              {index + 1}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold font-ddin capitalize"
                            >
                              {event.title}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-ddin"
                            >
                              {moment(event.datetime).format("LL")}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-ddin max-w-xs truncate"
                            >
                              {event.event_descriprion || "-"}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-ddin capitalize"
                            >
                              {event.batchInfo?.name || "-"}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-ddin"
                            >
                              {event?.createdBy?.name || "-"}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <div className="flex items-center gap-2">
                              {/* View Button */}
                              <button
                                onClick={() => setViewEvent(event)}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-400 text-gray-600 text-xs font-ddin hover:bg-gray-600 hover:text-white transition-colors"
                              >
                                View
                              </button>

                              {/* Join Button */}
                              <button
                                onClick={() => window.open(event.url)}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-500 text-blue-600 text-xs font-ddin hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                <IoVideocam className="text-base" />
                                Join
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Footer */}
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs font-myriad text-gray-500">
                  Showing {filteredEvents.length} event
                  {filteredEvents.length !== 1 ? "s" : ""}
                  {selectedBatchFilter !== "all" && (
                    <span>
                      {" "}
                      for batch:{" "}
                      <span className="font-semibold capitalize">
                        {
                          batch_items?.find(
                            (b) => b.batch_id === selectedBatchFilter,
                          )?.name
                        }
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[50vh] flex justify-center items-center flex-col">
                <p className="text-3xl font-ddin font-semibold text-center">
                  No result found
                </p>
                <p className="font-myriad font-light text-center text-gray-700">
                  {selectedBatchFilter !== "all"
                    ? "No events for the selected batch"
                    : "Add some items to cheer it up"}
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

      {/* ── Event Detail Modal ── */}
      {viewEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setViewEvent(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-lg mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-ddin text-gray-400 uppercase tracking-wide mb-1">
                  Event Details
                </p>
                <p className="text-xl font-ddin font-semibold capitalize">
                  {viewEvent.title}
                </p>
              </div>
              <button
                onClick={() => setViewEvent(null)}
                className="text-gray-400 hover:text-gray-700 text-2xl leading-none font-light"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="border-t border-gray-100 pt-4 grid gap-3 text-sm font-ddin">
              <div className="grid grid-cols-[130px_1fr] gap-2">
                <span className="text-gray-400">Date</span>
                <span className="text-gray-800">
                  {moment(viewEvent.datetime).format("LLL")}
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-2">
                <span className="text-gray-400">Batch</span>
                <span className="text-gray-800 capitalize">
                  {viewEvent.batchInfo?.name || "-"}
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-2">
                <span className="text-gray-400">Added By</span>
                <span className="text-gray-800">
                  {viewEvent.createdBy?.name || "-"}
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-2 items-start">
                <span className="text-gray-400">Meeting URL</span>
                <span className="text-blue-500 break-all text-xs">
                  {viewEvent.url || "-"}
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-2 items-start">
                <span className="text-gray-400">Description</span>
                <span className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {viewEvent.event_descriprion || "-"}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 mt-5 pt-4 flex justify-end gap-2">
              <button
                onClick={() => setViewEvent(null)}
                className="px-4 py-2 text-xs font-ddin border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => window.open(viewEvent.url)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-ddin border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <IoVideocam className="text-base" />
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      )}

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
