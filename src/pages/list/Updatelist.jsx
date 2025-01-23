import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#2d2d2d",
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "14px",
      borderBottom: "2px solid #444",
      padding: "10px", 
    },
  },
  cells: {
    style: {
      fontSize: "13px",
      color: "#f8f9fa",
      padding: "12px",
      backgroundColor: "#2d2d2d",
    },
  },
  rows: {
    style: {
      minHeight: "45px",
      backgroundColor: "#2d2d2d",
      borderBottom: "1px solid #444",
    },
    highlightOnHoverStyle: {
      backgroundColor: "#555", 
      borderBottomColor: "#6c757d",
      outline: "1px solid #6c757d",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#2d2d2d",
      color: "#ffffff",
    },
    pageButtonsStyle: {
      color: "#ffffff",
      fill: "#ffffff",
      "&:hover": {
        backgroundColor: "#444",
      },
      "&:focus": {
        backgroundColor: "#444",
      },
    },
  },
};

const Updatelist = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();  // Initialize navigate hook

  // Load data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
  }, []);

  // View button handler
  const handleView = (rowIndex) => {
    navigate(`/view/${rowIndex}`);
  };

  // Edit button handler
  const handleEdit = (rowIndex) => {
    navigate(`/edit/${rowIndex}`);
 

    const newTitle = prompt("Edit Title:", updatedRow.title);
    if (newTitle !== null) {
      updatedRow.title = newTitle; 
      updatedData[rowIndex] = updatedRow;
      setData(updatedData);
      localStorage.setItem("formData", JSON.stringify(updatedData));
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => index + 1,
        width: "50px",
        style: {
          fontWeight: "bold",
          color: "#ffffff",
          textAlign: "center",
        },
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
        style: {
          fontWeight: "500",
          paddingLeft: "10px", 
        },
      },
      {
        name: "Actions",
        cell: (row, index) => (
          <div className="flex space-x-1"> 
            <button
              onClick={() => handleView(index)} 
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
            >
              View
            </button>
            <button
              onClick={() => handleEdit(index)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleEdit(index)}
              className="bg-red-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded"
            >
              Delete
            </button>
          </div>
        ),
        width: "20%", 
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [data]
  );

  return (
    <div className="max-w-5xl mx-auto mt-5 bg-[#2d2d2d] p-6 rounded shadow-xl text-white">
      <h3 className="text-center text-2xl font-semibold mb-5">Form Submissions</h3>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        striped
        customStyles={customStyles}
      />
    </div>
  );
};

export default Updatelist;
