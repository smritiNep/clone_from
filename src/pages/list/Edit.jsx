import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  images: Yup.array().max(5, "You can upload up to 5 images."),
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
      setValue("needHelp", formData.needHelp);
      setValue("additional", formData.additional);
      setValue("images", formData.images || []);
    }
  }, [formData, setValue]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentFiles = watch("images") || [];

    //  total number of images exceeds 5
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
      };
      reader.readAsDataURL(file); // Convert file to base64
    });
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
    <div className="max-w-3xl mx-auto mt-3 p-6 bg-[#2d2d2d] text-white rounded shadow-xl">
      <h4 className="text-center text-3xl font-semibold mb-5">
        Edit Daily Update
      </h4>
      <hr className="my-4 border-gray-500" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Title</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full px-4 py-2 bg-[#444] text-white rounded"
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
            theme="snow"
            value={watch("keyUpdate") || ""}
            onChange={(value) => setValue("keyUpdate", value)}
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
            theme="snow"
            value={watch("summary") || ""}
            onChange={(value) => setValue("summary", value)}
            className="bg-[#444] text-white rounded-md"
            style={{ minHeight: "150px" }}
          />
          {errors.summary && (
            <p className="text-red-500">{errors.summary.message}</p>
          )}
        </div>

        {/* Tomorrow's Plan */}
        <div className="mb-4">
          <label className="flex items-center text-[#d1d1d1] mb-2">
            <span className="text-lg">Tomorrow's plan</span>
            <span className="text-red-500 ml-2">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={watch("upComming") || ""}
            onChange={(value) => setValue("upComming", value)}
            className="bg-[#444] text-white rounded-md"
            style={{ minHeight: "150px" }}
          />
          {errors.upComming && (
            <p className="text-red-500">{errors.upComming.message}</p>
          )}
        </div>

        {/* Radio Button */}
        <div className="mb-4">
          <label className="text-[#d1d1d1]">
            Need any Help? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-6">
            <label className="text-[#d1d1d1]">
              <input
                type="radio"
                {...register("radioButton")}
                value="Yes"
                className="mr-2"
              />
              Yes
            </label>
            <label className="text-[#d1d1d1]">
              <input
                type="radio"
                {...register("radioButton")}
                value="No"
                className="mr-2"
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
              theme="snow"
              value={watch("needHelp") || ""}
              onChange={(value) => setValue("needHelp", value)}
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
            theme="snow"
            value={watch("additional") || ""}
            onChange={(value) => setValue("additional", value)}
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
            className="bg-[#007bff] text-white py-2 px-6 rounded hover:bg-[#0056b3] font-semibold"
          >
            Update
          </button>
        </div>
      </form>

      <ToastContainer />
    
    </div>
  );
};

export default Edit;