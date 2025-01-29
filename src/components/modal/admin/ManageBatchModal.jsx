import {
  Button,
  Card,
  Dialog,
  IconButton,
  Input,
} from "@material-tailwind/react";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

function ManageBatchModal({ open, close, data, handleSubmit }) {
  return (
    <div>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="w-full p-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-gray-800 font-ddin mb-5">
              {data?.editable ? "Update" : "Add"} Batch
            </h1>
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              className="rounded-full hover:text-red-900 hover:bg-red-100"
              onClick={close}
            >
              <RiCloseCircleLine className="h-6 w-6 rounded-full" />
            </IconButton>
          </div>

          <form className="mb-2 w-auto" onSubmit={handleSubmit}>
            <Input
              label="Batch name"
              className="p-3"
              name="name"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              defaultValue={data?.batch_name || ""}
              required
            />

            <div className="flex justify-end mt-3">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
              >
                {data?.editable ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}

export default ManageBatchModal;
