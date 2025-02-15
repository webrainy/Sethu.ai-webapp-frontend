import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

function ManageBatchModal({
  open,
  close,
  data,
  handleChange,
  handleSubmit,
  loading,
  handleUpdate,
}) {
  return (
    <div>
      <Dialog
        size="xl"
        open={open}
        className="bg-transparent shadow-none outline-none"
      >
        <Card className="w-full p-5">
          <form onSubmit={data.editable ? handleUpdate : handleSubmit}>
            <DialogHeader className="flex justify-between items-center pt-0 px-0">
              <h1 className="text-xl font-bold text-gray-800 font-ddin">
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
            </DialogHeader>

            <DialogBody className="mb-2 w-full p-0 max-h-[50vh] md:max-h-[unset] overflow-y-auto sm:overflow-y-visible grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Batch name"
                className="p-3"
                name="batch_name"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                onChange={handleChange}
                value={data?.batch_name}
                required
              />
              <Input
                label="Start date"
                type="date"
                className="p-3"
                name="start_date"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                onChange={handleChange}
                // value={data?.start_date}
                value={data?.start_date ? data.start_date.split(" ")[0] : ""}
                required
              />
              <Input
                label="End date"
                type="date"
                className="p-3"
                name="end_date"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                onChange={handleChange}
                // value={data?.end_date}
                value={data?.end_date ? data.end_date.split(" ")[0] : ""}
                required
              />

              <Textarea
                label="Technologies"
                name="technologies"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                value={data?.technologies}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Tutor"
                name="tutor"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                value={data?.tutor}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Lab coordinator"
                name="lab_coordinator"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin",
                }}
                value={data?.lab_coordinator}
                onChange={handleChange}
                required
              />

              <Input
                label="Planned hours"
                className="p-3"
                name="planned_hours"
                style={{
                  fontFamily: "D-DIN",
                  fontWeight: 500,
                }}
                containerProps={{
                  className: "font-ddin md:col-span-2",
                }}
                onChange={handleChange}
                value={data?.planned_hours}
                required
              />
              <Input
                label="Actual hours"
                className="p-3"
                name="actual_hours"
                style={{
                  fontFamily: "D-DIN",
                  fontWeight: 500,
                }}
                containerProps={{
                  className: "font-ddin col-span-1",
                }}
                onChange={handleChange}
                value={data?.actual_hours}
                required
              />

              <Textarea
                label="Comments"
                name="comments"
                style={{ fontFamily: "D-DIN", fontWeight: 500 }}
                containerProps={{
                  className: "font-ddin md:col-span-3",
                }}
                value={data?.comments}
                onChange={handleChange}
              />
            </DialogBody>

            <DialogFooter className="flex justify-end mt-3 col-span-3 p-0">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633] disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Loading..." : data?.editable ? "Update" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}

export default ManageBatchModal;
