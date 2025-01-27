import React from "react";
import { Button } from "@material-tailwind/react";
import { MdKeyboardArrowRight } from "react-icons/md";

const studentsData = [
  {
    image: "https://example.com/image1.jpg",
    name: "John Doe",
    assignmentCompletedState: true,
  },
  {
    image: "https://example.com/image2.jpg",
    name: "Jane Smith",
    assignmentCompletedState: false,
  },
  {
    image: "https://example.com/image3.jpg",
    name: "Mark Taylor",
    assignmentCompletedState: true,
  },
  {
    image: "https://example.com/image4.jpg",
    name: "Emily Johnson",
    assignmentCompletedState: false,
  },
  {
    image: "https://example.com/image5.jpg",
    name: "David Williams",
    assignmentCompletedState: true,
  },
];

console.log(studentsData);

function AdminDashboard() {
  return (
    <div>
      <div className="bg-white  p-6 grid grid-cols-1 md:grid-cols-3 gap-5 rounded-2xl shadow-md">
        <div className="bg-[#032313] h-fit text-white p-4 rounded-xl font-semibold">
          <h1 className="text-sm flex items-center gap-2 pt-3 pb-3">
            <span className="w-2 h-2  rounded-full bg-red-800 shadow-[0px_4px_8px_rgba(270,73,73,1)]"></span>
            Update
          </h1>

          <p className="text-[#606161] text-xs">Jan 27th 2025</p>
          <p>
            Driving Success for{" "}
            <span className="text-green-900 text-base">300 </span>
            Learners!
          </p>
          <Button
            className="flex items-center justify-center text-xs normal-case bg-transparent shadow-none hover:shadow-none text-[#606161] gap-0 py-3 px-0"
            style={{ fontFamily: "afacad" }}
          >
            See Statistics
            <MdKeyboardArrowRight className="text-xl" />
          </Button>
        </div>
        <div className="bg-gray-100 h-fit p-4 rounded-xl border-gray-400 border-[0.5px]">
          <h1 className="text-xl flex items-center gap-2 pt-3 pb-3 font-semibold">
            A Snapshot of 15 Active Batches!
          </h1>
          <Button
            className="flex items-center justify-center text-xs normal-case bg-transparent shadow-none hover:shadow-none text-[#606161] gap-0 py-3 px-0"
            style={{ fontFamily: "afacad" }}
          >
            See Statistics
            <MdKeyboardArrowRight className="text-xl" />
          </Button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg row-span-2">
          <h1>Total view performance</h1>
          <div className="border-t border-gray-300 my-2 w-full"></div>
          <div className="space-y-4 mt-4">
            {studentsData.map((student, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold">{student.name}</p>
                  <p
                    className={`text-sm ${
                      student.assignmentCompletedState
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {student.assignmentCompletedState
                      ? "Completed"
                      : "Not Completed"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 p-4 w-full rounded-lg">fsaf</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
