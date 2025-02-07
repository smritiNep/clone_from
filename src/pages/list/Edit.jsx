import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";

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

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    const currentData = storedData.find((item) => item.id === id);
    if (currentData) {
      setFormData(currentData);
      setImagePreviews(currentData.images || []); // Set image previews
    }
  }, [id]);

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

  useEffect(() => {
    if (formData) {
      setValue("title", formData.title);
      setValue("keyUpdate", formData.keyUpdate);
      setValue("summary", formData.summary);
      setValue("upComming", formData.upComming);
      setValue("radioButton", formData.radioButton);
      setValue("needHelp", formData.needHelp || ""); // Ensure needHelp is registered
      setValue("additional", formData.additional);
      setValue("images", formData.images || []);
    }
  }, [formData, setValue]);

  // react-dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    maxFiles: 5, // Maximum number of files
    onDrop: (acceptedFiles) => {
      const currentFiles = getValues("images") || [];
      if (currentFiles.length + acceptedFiles.length > 5) {
        toast.error("You can upload up to 5 images.");
        return;
      }

      const newFiles = [...currentFiles];
      const newPreviews = [...imagePreviews];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newFiles.push(reader.result); // Store base64 string
          newPreviews.push(reader.result); // For preview
          setValue("images", newFiles, { shouldValidate: true });
          setImagePreviews(newPreviews);
        };
        reader.readAsDataURL(file); // Convert file to base64
      });
    },
  });

  const handleQuillChange = (fieldName, value) => {
    setValue(fieldName, value, { shouldValidate: true }); // Force validation
  };

  const onSubmit = (data) => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    const updatedData = storedData.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
    localStorage.setItem("formData", JSON.stringify(updatedData));

    toast.success("Form updated successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#71797E",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px 20px",
        fontWeight: "bold",
      },
    });

    setTimeout(() => {
      navigate("/Updates");
    }, 2000);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-3 mb-1 p-6 bg-[#2d2d2d] text-white rounded-[2px] shadow-xl mb-4">
      <h4 className="text-center text-3xl font-semibold mb-5">Edit Daily Update</h4>
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

        {/* Need Help Details */}
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

        {/* Image Upload with react-dropzone */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Add attachments</span>
          </label>
          <div
            {...getRootProps()}
            className="w-full p-6 border-2 border-dashed border-gray-400 rounded-md text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input {...getInputProps()} />
            <p className="text-gray-400">
              Drag & drop images here, or click to select files (max 5 images)
            </p>
          </div>
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
            <span>Update</span>
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Edit;