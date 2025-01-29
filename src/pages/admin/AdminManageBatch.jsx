import { Button } from "@material-tailwind/react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";

function AdminManageBatch() {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">Manage Batch</p>

        <Button className="shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]">
          Add Batch
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-3">
        {Array.from({ length: 5 }).map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl hover:shadow-md transition-all flex justify-between items-center"
          >
            <p className="font-ddin font-normal cursor-pointer">
              Batch {i + 1}
            </p>
            <div className="flex gap-4 items-center">
              <FaRegEdit className="text-lg cursor-pointer" />
              <VscPreview className="text-xl cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminManageBatch;
