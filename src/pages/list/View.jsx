import React from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const index = parseInt(id, 10);
  const storedData = JSON.parse(localStorage.getItem("dailyUpdates")) || [];
  const update = storedData[index];

  if (!update) {
    return <div className="text-white">Update not found!</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl mx-auto my-10">
      <div className="bg-gray-800 p-5 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4">{update.title}</h2>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <p><strong className="text-xl">Key Update:</strong> {update.keyUpdate}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <p><strong className="text-xl">Summary:</strong> {update.summary}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <p><strong className="text-xl">Tomorrow's Plan:</strong> {update.upComming}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <p><strong className="text-xl">Need Help:</strong> {update.needHelp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
