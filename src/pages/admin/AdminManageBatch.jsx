import { Button } from "@material-tailwind/react";
import React from "react";

function AdminManageBatch() {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-ddin font-semibold">Manage Batch</p>

        <Button className="shadow-none hover:shadow-none capitalize font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]">
          Add Batch
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-3 justify-center">
        <div>dfds</div>
        <div>dfds</div>
        <div>dfds</div>
        <div>dfds</div>
      </div>
    </div>
  );
}

export default AdminManageBatch;
