import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import moment from "moment";
import React from "react";

function ViewBatchDetails({ open, onClose, viewDetails }) {
  return (
    <Dialog open={open} size="lg" className="outline-none">
      <DialogHeader className="font-ddin font-bold border-b">
        {viewDetails.name}'s Details
      </DialogHeader>
      <DialogBody className="max-h-[50vh] sm:max-h-[70vh] overflow-y-auto">
        <div className="grid gap-4">
          <div className="box-shadow py-2 px-3 flex flex-col gap-2 text-[17px] font-ddin text-gray-800 rounded-xl font-semibold">
            <p className="flex items-center gap-2">
              Start date:{" "}
              <span className="font-normal">
                {viewDetails.start_date
                  ? moment(viewDetails.start_date).format("LL")
                  : "-"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              End date:{" "}
              <span className="font-normal">
                {viewDetails.end_date
                  ? moment(viewDetails.end_date).format("LL")
                  : "-"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              Technologies:{" "}
              <span className="font-normal">
                {viewDetails.technologies || "-"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              Tutor:{" "}
              <span className="font-normal">{viewDetails.tutor || "-"}</span>
            </p>
            <p className="flex items-center gap-2">
              Tutor:{" "}
              <span className="font-normal">{viewDetails.tutor || "-"}</span>
            </p>
            <p className="flex items-center gap-2">
              Lab coordinator:{" "}
              <span className="font-normal">
                {viewDetails.lab_coordinator || "-"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              Planned hour:{" "}
              <span className="font-normal">
                {viewDetails.planned_hour || "-"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              Actual hour:{" "}
              <span className="font-normal">
                {viewDetails.actual_hour || "-"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              Batch added by:{" "}
              <span className="font-normal">
                {viewDetails?.createdBy?.name || "-"}
              </span>
            </p>
          </div>
        </div>

        <div className="box-shadow py-2 px-3 flex flex-col gap-2 text-[17px] font-ddin font-medium text-gray-700 rounded-xl mt-4">
          <p className="text-xl font-semibold text-gray-800">Comments</p>
          <p>{viewDetails.comment || "-"}</p>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => onClose()}
          className="mr-1 font-ddin text-base outline-none"
        >
          <span>Close</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ViewBatchDetails;
