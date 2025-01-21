import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Updatelist = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dailyUpdates")) || [];
    setUpdates(storedData);
  }, []);

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-6 text-white">Updates</h2>
      <table className="w-full text-sm text-left text-white">
        <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {updates.length > 0 ? (
            updates.map((update, index) => (
              <tr
                key={index}
                className="bg-gray-800 border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
              >
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {update.title}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/view/${index}`}  
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${index}`}  
                    className="text-yellow-500 ml-4 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-gray-400 dark:text-gray-500">
                No updates available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Updatelist;
