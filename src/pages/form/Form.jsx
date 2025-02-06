import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom"; 

// Validation schema with Yup
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  keyUpdate: Yup.string().required("Key update is required"),
  summary: Yup.string().required("Summary is required"),
  upComming: Yup.string().required("Tomorrow's plan is required"),
  radioButton: Yup.string().required("Please select whether you need help"),
  needHelp: Yup.string().when("radioButton", {
    is: "Yes",
    then: (schema) => schema.required("Please provide details"),
    otherwise: (schema) => schema.notRequired(),
  }),
  additional: Yup.string(),
  images: Yup.array()
    .of(Yup.mixed().required("An image is required"))
    .max(5, "You can upload up to 5 images."),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleQuillChange = (fieldName, value) => {
    setValue(fieldName, value);
  };

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentFiles = getValues("images") || [];

    // total number of images exceeds 5
    if (currentFiles.length + files.length > 5) {
      toast.error("You can upload up to 5 images.");
      return;
    }

    // Convert files to base64 and store them
    const newFiles = [...currentFiles];
    const newPreviews = [...imagePreviews];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newFiles.push(reader.result); // Store base64 string
        newPreviews.push(reader.result); // For preview
        setValue("images", newFiles);
        setImagePreviews(newPreviews);

        // Save to localStorage
        const storedData = JSON.parse(localStorage.getItem("formData")) || [];
        const formDataWithId = { ...getValues(), images: newFiles, id: uuidv4() };
        storedData.push(formDataWithId);
        localStorage.setItem("formData", JSON.stringify(storedData));
      };
      reader.readAsDataURL(file); // Convert file to base64
    });
  };

  const onSubmit = (data) => {
    // Generate a unique ID for the form submission
    const formDataWithId = { ...data, id: uuidv4() };

    // Store the form data in localStorage
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    storedData.push(formDataWithId);
    localStorage.setItem("formData", JSON.stringify(storedData));

    console.log("Form Submitted", formDataWithId);
    toast.success("Form submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#71797E",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px 20px",
        marginTop: "10px",
        fontWeight: "bold",
      },
    });

    // Redirect to View page
    navigate(`/view/${formDataWithId.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-3 mb-1 p-6 bg-[#2d2d2d] text-white rounded-[2px] shadow-xl mb-4">
      <h4 className="text-center text-3xl font-semibold mb-5">Daily Update</h4>
      <hr className="my-8 h-0.5 border-t-0 bg-gray-400 dark:bg-white/10" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Title */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Title</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter a title for this form"
            className="w-full px-4 py-2 bg-[#444] border-[#444] focus:border-[#007bff] text-white rounded-md"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Key Updates */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Key updates</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <ReactQuill
            placeholder="Enter your response..."
            theme="snow"
            value={watch("keyUpdate") || ""}
            onChange={(value) => handleQuillChange("keyUpdate", value)}
            className="bg-[#444] text-white rounded-md"
            style={{ minHeight: "150px" }}
          />
          {errors.keyUpdate && (
            <p className="text-red-500">{errors.keyUpdate.message}</p>
          )}
        </div>

        {/* Summary */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Summary of today's work completed</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <ReactQuill
            placeholder="Enter your response..."
            theme="snow"
            value={watch("summary") || ""}
            onChange={(value) => handleQuillChange("summary", value)}
            className="bg-[#444] text-white rounded-md"
            style={{ minHeight: "150px" }}
          />
          {errors.summary && (
            <p className="text-red-500">{errors.summary.message}</p>
          )}
        </div>

        {/* Plans for Tomorrow */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Tomorrow's plan</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <ReactQuill
            placeholder="Enter your response..."
            theme="snow"
            value={watch("upComming") || ""}
            onChange={(value) => handleQuillChange("upComming", value)}
            className="bg-[#444] text-white rounded-md"
            style={{ minHeight: "150px" }}
          />
          {errors.upComming && (
            <p className="text-red-500">{errors.upComming.message}</p>
          )}
        </div>

        {/* Radio Buttons */}
        <div className="mb-4">
          <label className="text-[#d1d1d1] font-semibold mb-2 block">
            <span>Need any Help?</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <div className="flex items-center space-x-6">
            <label className="text-[#d1d1d1]">
              <input
                type="radio"
                {...register("radioButton")}
                value="Yes"
                className="text-[#007bff] mr-2"
              />
              Yes
            </label>
            <label className="text-[#d1d1d1]">
              <input
                type="radio"
                {...register("radioButton")}
                value="No"
                className="text-[#007bff] mr-2"
              />
              No
            </label>
          </div>
          {errors.radioButton && (
            <p className="text-red-500">{errors.radioButton.message}</p>
          )}
        </div>
        {watch("radioButton") === "Yes" && (
          <div className="mb-4">
            <label className="flex items-center text-[#d1d1d1] mb-2">
              <span className="text-lg">If yes, provide details</span>
              <span className="text-red-500 ml-2">*</span>
            </label>
            <ReactQuill
              placeholder="Enter your response..."
              theme="snow"
              value={watch("needHelp") || ""}
              onChange={(value) => handleQuillChange("needHelp", value)}
              className="bg-[#444] text-white rounded-md"
              style={{ minHeight: "150px" }}
            />
            {errors.needHelp && (
              <p className="text-red-500">{errors.needHelp.message}</p>
            )}
          </div>
        )}

        {/* Additional Message */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Additional message</span>
          </label>
          <ReactQuill
            placeholder="Enter your response..."
            theme="snow"
            value={watch("additional") || ""}
            onChange={(value) => handleQuillChange("additional", value)}
            className="bg-[#444] text-white rounded-md"
            style={{ minHeight: "150px" }}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Upload Images</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 bg-[#444] border-[#444] focus:border-[#007bff] text-white rounded-md"
          />
          {errors.images && (
            <p className="text-red-500">{errors.images.message}</p>
          )}
        </div>

        {/* Image Previews */}
        <div className="mt-2 flex space-x-2 overflow-x-auto">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`preview-${index}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="bg-[#007bff] text-white py-2 px-6 rounded-md hover:bg-[#0056b3] font-semibold flex items-center space-x-2 mt-3"
          >
            <span>Submit</span>
          </button>
        </div>
      </form>

      <ToastContainer />
      {/* Internal CSS */}
      <style jsx>{`
        .ql-editor {
          color: white !important;
        }

        .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.6) !important;
        }

        .ql-container.ql-snow {
          border: none !important;
          background: transparent !important;
        }

        .ql-toolbar.ql-snow {
          border: none !important;
          background: transparent !important;
        }

        /* Toolbar Button Hover and Active Effects */
        .ql-toolbar .ql-stroke {
          stroke: white !important; /* Default icon color */
          transition: stroke 0.2s ease-in-out;
        }

        .ql-toolbar .ql-fill {
          fill: white !important; /* Default icon color */
          transition: fill 0.2s ease-in-out;
        }

        .ql-toolbar .ql-picker-label {
          color: white !important; /* Default text color */
          transition: color 0.2s ease-in-out;
        }

        /* Correct Hover Effect for Toolbar Buttons */
        .ql-toolbar button:hover {
          background-color: rgba(
            255,
            255,
            255,
            0.2
          ); /* Example hover background */
        }

        .ql-toolbar button:hover .ql-stroke {
          stroke: rgba(51, 95, 239, 0.96) !important; /* Hover icon color */
        }

        .ql-toolbar button:hover .ql-fill {
          fill: rgba(51, 95, 239, 0.96) !important; /* Hover icon color */
        }

        .ql-toolbar button:hover .ql-picker-label {
          color: rgba(51, 95, 239, 0.96); /* Hover text color */
        }

        /* Active/Selected State */
        .ql-toolbar button.ql-active,
        .ql-toolbar button:active,
        .ql-toolbar .ql-picker-label.ql-active {
          background-color: rgba(
            255,
            255,
            255,
            0.4
          ); /* Example active background */
        }

        .ql-toolbar button.ql-active .ql-stroke,
        .ql-toolbar button:active .ql-stroke,
        .ql-toolbar .ql-picker-label.ql-active {
          stroke: rgba(
            51,
            95,
            239,
            0.96
          ) !important; /* Example active icon color (blue) */
        }

        .ql-toolbar button.ql-active .ql-fill,
        .ql-toolbar button:active .ql-fill,
        .ql-toolbar .ql-picker-label.ql-active {
          fill: rgba(
            51,
            95,
            239,
            0.96
          ) !important; /* Example active icon color (blue) */
        }

        .ql-toolbar button.ql-active .ql-picker-label,
        .ql-toolbar button:active .ql-picker-label,
        .ql-toolbar .ql-picker-label.ql-active {
          color: rgba(
            51,
            95,
            239,
            0.96
          ) !important; /* Example active text color (blue) */
        }

        .ql-container {
          min-height: 150px !important;
          border: 1px solid transparent !important;
          transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out !important;
        }

        .ql-container:focus-within,
        .ql-container.ql-focused {
          border: 2px solid rgb(246, 247, 247) !important;
          border-radius: 8px !important;
          box-shadow: 0 0 0 2px rgb(33, 150, 243) !important;
        }
      `}</style>
    </div>
  );
};

export default Form;