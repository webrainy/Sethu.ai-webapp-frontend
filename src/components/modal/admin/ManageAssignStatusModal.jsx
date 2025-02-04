import {
  Button,
  Card,
  Dialog,
  IconButton,
  Option,
  Select,
} from "@material-tailwind/react";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

function ManageAssignStatusModal({
  open,
  close,
  data,
  handleChange,
  handleSubmit,
  loading,
}) {
  return (
    <div>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="w-full p-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-gray-800 font-ddin mb-5">
              Update assignment
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
            <Select
              name="commit_ft"
              label="Commitment"
              value={String(data.compl_status)}
              onChange={(e) => handleChange(e)}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
            >
              <Option value="1" style={{ fontFamily: "D-DIN" }}>
                Pending
              </Option>
              <Option value="2" style={{ fontFamily: "D-DIN" }}>
                Completed
              </Option>
              <Option value="3" style={{ fontFamily: "D-DIN" }}>
                Rejected
              </Option>
            </Select>

            <div className="flex justify-end mt-3">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633] disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}

export default ManageAssignStatusModal;
