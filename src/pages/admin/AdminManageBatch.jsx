import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import ManageBatchModal from "../../components/modal/admin/ManageBatchModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBatchItems,
  postBatchItem,
  putBatchItem,
} from "../../redux/batchSlice";
import toast from "react-hot-toast";
import moment from "moment";
import { LuEye } from "react-icons/lu";
import ViewBatchDetails from "../../components/modal/admin/ViewBatchDetails";

function AdminManageBatch() {
  const [modal, setModal] = useState({
    add: false,
    update: false,
    view_details: false,
  });
  const [data, setData] = useState({
    batch_name: "",
    start_date: "",
    end_date: "",
    technologies: "",
    tutor: "",
    lab_coordinator: "",
    planned_hours: "",
    actual_hours: "",
    comments: "",
    editable: false,
  });
  const [viewDetails, setViewDetails] = useState({});
  const dispatch = useDispatch();
  const { loading, batch_items } = useSelector((state) => state.batch);
  // const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  useEffect(() => {
    dispatch(
      fetchBatchItems({
        end_point: "/api/batch/list",
        access_token: access_token,
      })
    ).unwrap();
  }, [dispatch]);

  const handleAddModal = () => {
    setModal({ ...modal, add: true });
    setData({
      ...data,
      batch_name: "",
      start_date: "",
      end_date: "",
      technologies: "",
      tutor: "",
      lab_coordinator: "",
      planned_hours: "",
      actual_hours: "",
      comments: "",
      editable: false,
    });
  };

  const handleUpdateModal = (item_data) => {
    setModal({ ...modal, update: true });
    setData({
      ...data,
      batch_name: item_data.name,
      batch_id: item_data.batch_id,
      start_date: item_data.start_date,
      end_date: item_data.end_date,
      technologies: item_data.technologies,
      tutor: item_data.tutor,
      lab_coordinator: item_data.lab_coordinator,
      planned_hours: item_data.planned_hour,
      actual_hours: item_data.actual_hour,
      comments: item_data.comment || "",
      editable: true,
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      postBatchItem({
        end_point: "/api/batch/create",
        access_token: access_token,
        item_data: {
          name: data.batch_name,
          start_date: data.start_date,
          end_date: data.end_date,
          technologies: data.technologies,
          tutor: data.tutor,
          lab_coordinator: data.lab_coordinator,
          planned_hour: data.planned_hours,
          actual_hour: data.actual_hours,
          comment: data.comments,
        },
      })
    ).unwrap();
    if (result.responseCode === 200) {
      toast.success("Batch added successfully!");
      setModal({ ...modal, add: false });
      dispatch(
        fetchBatchItems({
          end_point: "/api/batch/list",
          access_token: access_token,
        })
      ).unwrap();
    } else {
      toast.error(
        result.responseMessage || "Connection failed. Please try again."
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      putBatchItem({
        end_point: `/api/batch/edit?batch_id=${data.batch_id}`,
        access_token: access_token,
        item_data: {
          name: data.batch_name,
          start_date: data.start_date,
          end_date: data.end_date,
          technologies: data.technologies,
          tutor: data.tutor,
          lab_coordinator: data.lab_coordinator,
          planned_hour: data.planned_hours,
          actual_hour: data.actual_hours,
          comment: data.comments,
        },
      })
    ).unwrap();
    if (result.responseCode === 200) {
      toast.success("Batch updated successfully!");
      setModal({ ...modal, update: false });
      dispatch(
        fetchBatchItems({
          end_point: "/api/batch/list",
          access_token: access_token,
        })
      ).unwrap();
    } else {
      toast.error(
        result.responseMessage || "Connection failed. Please try again."
      );
    }
  };

  const handleViewDetails = (item_data) => {
    setModal({ ...modal, view_details: true });
    setViewDetails(item_data);
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-ddin font-semibold">Manage Batch</p>

          <Button
            onClick={handleAddModal}
            className="shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
          >
            Add Batch
          </Button>
        </div>

        {!loading ? (
          <>
            {batch_items.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-3">
                {batch_items.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white rounded-xl hover:shadow-md transition-all flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <p
                        className="font-ddin font-semibold cursor-pointer text-lg capitalize"
                        onClick={() =>
                          navigate("/admin/batch/details", { state: { item } })
                        }
                      >
                        {item.name}
                      </p>
                      <div className="flex gap-4 items-center">
                        <FaRegEdit
                          onClick={() => handleUpdateModal(item)}
                          className="text-lg cursor-pointer"
                        />
                        <VscPreview
                          onClick={() =>
                            navigate("/admin/batch/details", {
                              state: { item },
                            })
                          }
                          className="text-xl cursor-pointer"
                        />
                        <LuEye
                          className="text-xl cursor-pointer"
                          onClick={() => handleViewDetails(item)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col font-ddin font-semibold">
                      <p>
                        Start date:{" "}
                        <span className="font-normal">
                          {item.start_date
                            ? moment(item.start_date).format("LL")
                            : "-"}
                        </span>
                      </p>
                      <p>
                        End date:{" "}
                        <span className="font-normal">
                          {item.end_date
                            ? moment(item.end_date).format("LL")
                            : "-"}
                        </span>
                      </p>
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

      <ManageBatchModal
        open={modal.add}
        close={() => setModal({ ...modal, add: false })}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <ManageBatchModal
        open={modal.update}
        close={() => setModal({ ...modal, update: false })}
        data={data}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        loading={loading}
      />
      <ViewBatchDetails
        open={modal.view_details}
        onClose={() => setModal({ ...modal, view_details: false })}
        viewDetails={viewDetails}
      />
    </>
  );
}

export default AdminManageBatch;
