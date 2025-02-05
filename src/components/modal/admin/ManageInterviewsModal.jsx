import {
  Button,
  Card,
  Dialog,
  IconButton,
  Input,
  Option,
  Radio,
  Select,
} from "@material-tailwind/react";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import ReactSelect from "react-select";

function ManageInterviewsModal({
  open,
  close,
  data,
  batch_items,
  handleChange,
  setData,
  handleFetchBatchDetails,
  selectedItems,
  handleSubmit,
}) {
  return (
    <div>
      <Dialog size="md" open={open} className="bg-transparent shadow-none">
        <Card className="w-full p-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-gray-800 font-ddin mb-5">
              {data?.editable ? "Update" : "Add"} Interview
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
            className="mb-2 w-auto flex flex-col gap-3"
            onSubmit={handleSubmit}
            // onSubmit={data.editable ? handleUpdate : handleSubmit}
          >
            <Input
              label="Interview name"
              className="p-3"
              name="title"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={handleChange}
              value={data?.title}
              required
            />
            <Input
              label="Interview URL"
              className="p-3"
              name="url"
              type="url"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              value={data.url}
              onChange={handleChange}
              required
            />
            <Input
              label="Interview start timing"
              type="datetime-local"
              name="time"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              value={data.time}
              onChange={handleChange}
              required
            />

            <Select
              label="Select a Batch"
              name="batch_name"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              value={data.batch_name}
              onChange={(e) => {
                setData({ ...data, batch_name: e });
                handleFetchBatchDetails(e);
              }}
            >
              {batch_items?.map((item, i) => (
                <Option
                  key={i}
                  value={item.batch_id}
                  style={{ fontFamily: "D-DIN" }}
                >
                  {item.name}
                </Option>
              ))}
            </Select>

            {data.batch_name && (
              <div className="flex items-center gap-5">
                <Radio
                  name="student_type"
                  value="1"
                  label="All"
                  onChange={handleChange}
                />
                <Radio
                  name="student_type"
                  value="2"
                  label="Only with"
                  onChange={handleChange}
                />
              </div>
            )}

            {data.student_type == 2 && (
              <ReactSelect
                //   defaultValue={[colourOptions[2], colourOptions[3]]}
                isMulti
                name="students"
                options={selectedItems[0]?.students?.map((student, i) => ({
                  value: student.student_id,
                  label: student.name,
                }))}
                className="basic-multi-select font-ddin"
                classNamePrefix="select"
                onChange={(e) => setData({ ...data, students: e })}
                required
              />
            )}

            <div className="flex justify-end mt-3">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633] disabled:cursor-not-allowed"
                // disabled={loading}
              >
                {/* {loading ? "Loading..." : data?.editable ? "Update" : "Submit"} */}
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}

export default ManageInterviewsModal;
