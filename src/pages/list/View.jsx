import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Edit, Clear } from "@mui/icons-material";

const View = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    const currentData = storedData.find((item) => item.id === id);
    if (currentData) {
      setFormData(currentData);
    }
  }, [id]);

  if (!formData) {
    return <div>Data Not Found</div>;
  }

  // Function to sanitize and render HTML content
  const renderHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  // Function to check if Quill content is truly empty
  const isEmptyHTML = (html) => {
    const cleanHtml = DOMPurify.sanitize(html).replace(/<\/?p>|<br>/g, "").trim();
    return cleanHtml.length === 0;
  };

  return (
    <div className="p-2 bg-gray-900 text-white rounded-none shadow-sm max-w-3xl mx-auto my-1">
      <div className="bg-[#2d2d2d] p-5 rounded-none shadow-md">
        <h4 className="text-left text-3xl font-semibold mb-0 mt-0">View</h4>
        <div className="mt-[-30px] ml-[80px]">
          <Link to={`/edit/${id}`}>
            <button className="text-blue-500 hover:text-blue-200 transition-colors duration-200">
              <Edit style={{ color: "inherit" }} />
            </button>
          </Link>
        </div>
        <div className="flex space-x-4 mt-[-25px] ml-[675px]">
          <Link to={`/updates`}>
            <button className="text-blue-500 hover:text-blue-200 transition-colors duration-200">
              <Clear style={{ color: "inherit" }} />
            </button>
          </Link>
        </div>
        <hr className="my-5 h-0.5 border-t-0 bg-gray-400 dark:bg-white/10" />
        <div className="space-y-4">
          {/* Title */}
          <div className="mb-4 mt-7">
            <label className="block text-lg mb-2 text-[#d1d1d1]">Title:</label>
            <div className="bg-[#444] p-4 rounded-md text-white">{formData.title}</div>
          </div>

          {/* Key Update */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1]">Key Update:</label>
            <div className="bg-[#444] p-4 rounded-md text-white quill-content" dangerouslySetInnerHTML={renderHTML(formData.keyUpdate)} />
          </div>

          {/* Summary */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1]">Summary:</label>
            <div className="bg-[#444] p-4 rounded-md text-white quill-content" dangerouslySetInnerHTML={renderHTML(formData.summary)} />
          </div>

          {/* Tomorrow's Plan */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1]">Tomorrow's Plan:</label>
            <div className="bg-[#444] p-4 rounded-md text-white quill-content" dangerouslySetInnerHTML={renderHTML(formData.upComming)} />
          </div>

          {/* Need Help & Help Details */}
          <div className="mb-4">
            <label className="block text-lg mb-2 text-[#d1d1d1]">Need Help:</label>
            <div className="bg-[#444] p-4 rounded-md text-white">{formData.radioButton === "Yes" ? "Yes" : "No"}</div>
          </div>
          {formData.radioButton === "Yes" && (
            <div className="mb-8 mt-4">
              <label className="block text-lg mb-2 text-[#d1d1d1]">Help Details:</label>
              <div className="bg-[#444] p-4 rounded-md text-white quill-content" dangerouslySetInnerHTML={renderHTML(formData.needHelp)} />
            </div>
          )}

          {/* Additional Message */}
          {formData.additional && !isEmptyHTML(formData.additional) && (
            <div className="mb-4">
              <label className="block text-lg mb-2 text-[#d1d1d1]">Additional Message:</label>
              <div className="bg-[#444] p-4 rounded-md text-white quill-content" dangerouslySetInnerHTML={renderHTML(formData.additional)} />
            </div>
          )}

          {/* Display Images */}
          {formData.images && formData.images.length > 0 && (
            <div className="mb-4">
              <label className="block text-lg mb-2 text-[#d1d1d1]">Uploaded Images:</label>
              <div className="flex space-x-2 overflow-x-auto">
                {formData.images.map((image, index) => (
                  <img key={index} src={image} alt={`uploaded-${index}`} className="w-24 h-24 object-cover rounded-md" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Fix for Quill */}
      <style jsx>{`
        .quill-content:empty {
          display: none;
        }
        
        .quill-content p:empty {
          display: none;
        }

        .quill-content ul,
        .quill-content ol {
          margin-left: 20px;
        }

        .quill-content ul {
          list-style-type: disc;
        }

        .quill-content ol {
          list-style-type: decimal;
        }

        .quill-content li {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default View;
