import React from "react";

function AdminAssignmentDetails() {
  return (
    <div className="p-3">
      <div>
        <p className="text-3xl font-ddin font-semibold">Manage Batch</p>
        <p className="font-myriad font-light text-lg">
          Student Name:{" "}
          <span className="font-ddin font-semibold capitalize">
            {/* {selectedItems[0]?.name} */}
          </span>
        </p>
        <p className="font-myriad font-light text-lg">
          Batch Name:{" "}
          <span className="font-ddin font-semibold capitalize">
            {/* {selectedItems[0]?.name} */}
          </span>
        </p>
      </div>
      
    </div>
  );
}

export default AdminAssignmentDetails;
