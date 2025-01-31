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

function AdminManageBatch() {
  const [modal, setModal] = useState({ add: false, update: false });
  const [data, setData] = useState({ batch_name: "", editable: false });
  const dispatch = useDispatch();
  const { error, loading, batch_items } = useSelector((state) => state.batch);
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
    setData({ ...data, batch_name: "", editable: false });
  };

  const handleUpdateModal = (item_data) => {
    setModal({ ...modal, update: true });
    setData({
      ...data,
      batch_name: item_data.name,
      batch_id: item_data.batch_id,
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
        item_data: data,
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
        item_data: data,
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
                    className="p-4 bg-white rounded-xl hover:shadow-md transition-all flex justify-between items-center"
                  >
                    <p
                      className="font-ddin font-normal cursor-pointer"
                      onClick={() => navigate("/admin/batch/details")}
                    >
                      {item.name}
                    </p>
                    <div className="flex gap-4 items-center">
                      <FaRegEdit
                        onClick={() => handleUpdateModal(item)}
                        className="text-lg cursor-pointer"
                      />
                      <VscPreview
                        onClick={() => navigate("/admin/batch/details")}
                        className="text-xl cursor-pointer"
                      />
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
    </>
  );
}

export default AdminManageBatch;
