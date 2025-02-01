import {
  Button,
  Card,
  Dialog,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

function AssignAssignementModal({
  open,
  close,
  data,
  handleAllStudentSubmit,
  handleChange,
  loading,
  modal,
  handleParticularStudentSubmit,
}) {
  return (
    <div>
      <Dialog size="lg" open={open} className="bg-transparent shadow-none">
        <Card className="w-full p-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-gray-800 font-ddin mb-3">
              Launch Assignments
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

          <form
            className="flex flex-col gap-3 "
            onSubmit={
              modal?.particular_student_modal
                ? handleParticularStudentSubmit
                : handleAllStudentSubmit
            }
          >
            <Input
              label="Assignment name"
              type="text"
              className="p-3"
              name="assgn_name"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              value={data.assgn_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Assignment URL"
              type="url"
              className="p-3"
              name="assgn_url"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              value={data.assgn_url}
              onChange={handleChange}
            />
            <Textarea
              label="Assignment description"
              name="assgn_desc"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              value={data.assgn_desc}
              onChange={handleChange}
              required
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633]"
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

export default AssignAssignementModal;
