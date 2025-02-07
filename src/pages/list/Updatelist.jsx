import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const customStyles = {
  table: {
    style: {
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      borderRadius: "8px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#171616",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      textAlign: "left",
      padding: "14px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#222",
      borderBottom: "1px solid #333",
      minHeight: "50px",
      "&:nth-of-type(odd)": {
        backgroundColor: "#2a2a2a",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "#333",
      transition: "all 0.3s ease-in-out",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      color: "#f1f1f1",
      padding: "14px",
    },
  },
};

const Updatelist = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
    setFilteredData(storedData); // Initialize filteredData with the full data
  }, []);

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); 
    }
  }, [searchQuery, data]);

  // Handle view action
  const handleView = (id) => navigate(`/view/${id}`);

  // Handle edit action
  const handleEdit = (id) => navigate(`/edit/${id}`);

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this item?")) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
      localStorage.setItem("formData", JSON.stringify(updatedData));
    }
  };

  // Define columns for the DataTable
  const columns = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => index + 1,
        width: "60px",
        style: { fontWeight: "bold", textAlign: "center", color: "#fff" },
      },
      {
        name: "Title",
        selector: (row) => row.title,
        style: {
          fontWeight: "500",
          textAlign: "left",
          paddingLeft: "12px",
        },
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex space-x-4">
            <button
              onClick={() => handleView(row.id)}
              className="text-blue-500 hover:text-blue-200 transition-colors duration-200"
            >
              <Visibility style={{ color: "inherit" }} />
            </button>
            <button
              onClick={() => handleEdit(row.id)}
              className="text-blue-500 hover:text-blue-200 transition-colors duration-200"
            >
              <Edit style={{ color: "inherit" }} />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="text-blue-500 hover:text-blue-200 transition-colors duration-200"
            >
              <Delete style={{ color: "inherit" }} />
            </button>
          </div>
        ),
        width: "30%",
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [data]
  );

  return (
    <div className="max-w-5xl mx-auto mt-3 bg-[#2d2d2d] p-8 rounded-none shadow-lg text-white">
      <h3 className="text-center text-3xl font-semibold mb-6">Update List</h3>
      <div className="shadow-xl rounded-none overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredData}
          striped
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default Updatelist;