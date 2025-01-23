import React from "react";
import { useParams, Link } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const index = parseInt(id, 10);

  // Retrieve data from localStorage under 'formData'
  const storedData = JSON.parse(localStorage.getItem("formData")) || [];
  const update = storedData[index];

  if (!update) {
    return <div className="text-white">Update not found!</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl mx-auto my-10">
      <div className="bg-[#2d2d2d] p-5 rounded-lg shadow-md">
        {/* Title and Edit Button */}
        <div>
        <div className="flex items-center space-x-4">
          <h4 className="text-left text-3xl font-semibold mb-2 mt-4">View</h4>
          <Link to={`/edit/${id}`}>
            <button class="bg-blue-600 text-white px-7 py-2 rounded-md hover:bg-blue-700 mt-2">
              Edit
            </button>
          </Link>
        </div>
        </div>

        {/* Divider */}
        <hr className="my-4 h-0.5 border-t-0 bg-gray-400 dark:bg-white/10" />

        {/* Title */}
        <div className="mb-4 mt-10">
          <label className="block text-lg mb-2 text-[#d1d1d1]">Title:</label>
          <div className="bg-[#444] p-4 rounded-md text-white">
            {update.title}
          </div>
        </div>

        <div className="space-y-4">
          {/* Key Update */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1]">
              Key Update:
            </label>
            <div className="bg-[#444] p-4 rounded-md text-white">
              {update.keyUpdate}
            </div>
          </div>

          {/* Summary */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1]">
              Summary:
            </label>
            <div className="bg-[#444] p-4 rounded-md text-white">
              {update.summary}
            </div>
          </div>

          {/* Tomorrow's Plan */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1] ">
              Tomorrow's Plan:
            </label>
            <div className="bg-[#444] p-4 rounded-md text-white">
              {update.upComming}
            </div>
          </div>

          {/* Need Help */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1]">
              Need Help:
            </label>
            <div className="bg-[#444] p-4 rounded-md text-white">
              {update.radioButton === "Yes" ? "Yes" : "No"}
            </div>
            {update.radioButton === "Yes" && (
              <div className="mb-8 mt-4">
                <label className="block text-lg mb-2 text-[#d1d1d1] ">
                  Help Details:
                </label>
                <div className="bg-[#444] p-4 rounded-md text-white">
                  {update.needHelp}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
