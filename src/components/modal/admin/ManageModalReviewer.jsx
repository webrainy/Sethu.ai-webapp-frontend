import {
  Button,
  Card,
  Dialog,
  IconButton,
  Input,
} from "@material-tailwind/react";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TbEye, TbEyeOff } from "react-icons/tb";

function ManageModalReviewer({
  open,
  close,
  data,
  handleChange,
  handleSubmit,
  loading,
  // handleUpdate,
  passVisible,
  handlePasswordVisibility,
}) {
  return (
    <div>
      <Dialog size="sm" open={open} className="bg-transparent shadow-none">
        <Card className="w-full p-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-gray-800 font-ddin mb-5">
              {data?.editable ? "Update" : "Add"} Reviewer
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
            onSubmit={data.editable ? "" : handleSubmit}
          >
            <Input
              label="Reviewer name"
              className="p-3"
              name="name"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={handleChange}
              value={data?.name}
              required
            />
            <Input
              label="Reviewer Phone number"
              type="number"
              className="p-3"
              name="phone"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  handleChange(e);
                }
              }}
              value={data?.phone}
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "-" ||
                  e.key === "+"
                ) {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => e.target.blur()}
              maxLength={10}
              required
            />
            <Input
              label="Reviewer email"
              className="p-3"
              name="email"
              type="email"
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={handleChange}
              value={data?.email}
              required
            />
            <Input
              label="Reviewer password"
              className="p-3"
              name="password"
              type={!passVisible ? "password" : "text"}
              style={{ fontFamily: "D-DIN", fontWeight: 500 }}
              containerProps={{
                className: "font-ddin",
              }}
              onChange={handleChange}
              value={data?.password}
              icon={
                !passVisible ? (
                  <TbEyeOff
                    onClick={handlePasswordVisibility}
                    className="cursor-pointer"
                  />
                ) : (
                  <TbEye
                    onClick={handlePasswordVisibility}
                    className="cursor-pointer"
                  />
                )
              }
              required
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="shadow-none hover:shadow-none capitalize py-2 font-ddin font-normal text-base border-[#DD4633] border bg-transparent text-[#DD4633] hover:text-white hover:bg-[#DD4633] disabled:cursor-not-allowed"
                loading={loading}
              >
                {loading ? "Loading..." : data?.editable ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}

export default ManageModalReviewer;
