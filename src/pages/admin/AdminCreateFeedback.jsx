import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../utils/constants";
import toast from "react-hot-toast";
import { Button, Input } from "@material-tailwind/react";

function AdminCreateFeedback() {
  const location = useLocation().state;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("sethu_admin_access_token");

  const batch_id = location?.batch_id;
  const batchName = location?.batchName;

  const [formData, setFormData] = useState({ title: "", feedback_date: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Please enter feedback title.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${base_url}/api/feedback/create`, {
        method: "POST",
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          feedback_date: formData.feedback_date || null,
          batch_id,
        }),
      });
      const data = await res.json();
      if (data.responseCode === 200) {
        toast.success("Feedback created successfully!");
        navigate("/admin/batch/feedback", { state: { batch_id, batchName } });
      } else {
        toast.error(data.responseMessage || "Failed to create feedback.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-[#f7f7f7]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-3xl font-ddin font-bold text-blue-gray-900">
            Create Feedback
          </p>
          <p className="font-myriad font-light text-gray-500 mt-1">
            Batch:{" "}
            <span className="font-ddin font-semibold text-[#FF9D23]">
              {batchName}
            </span>
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm font-ddin text-gray-400 hover:text-[#DD4633] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Feedback Title *"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            containerProps={{ className: "font-ddin" }}
            placeholder="e.g. Mid Term Feedback"
          />
          <Input
            label="Feedback Date (optional)"
            type="date"
            value={formData.feedback_date}
            onChange={(e) =>
              setFormData({ ...formData, feedback_date: e.target.value })
            }
            style={{ fontFamily: "D-DIN", fontWeight: 500 }}
            containerProps={{ className: "font-ddin" }}
          />
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate(-1)}
              className="normal-case font-ddin shadow-none hover:shadow-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="normal-case font-ddin shadow-none hover:shadow-none bg-[#DD4633]"
            >
              {loading ? "Creating..." : "Create Feedback"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateFeedback;
