import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema with Yup
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  keyUpdate: Yup.string().required("Key update is required"),
  summary: Yup.string().required("Summary is required"),
  upComming: Yup.string().required("Tomorrow's plan is required"),
  radioButton: Yup.string().required("Please select whether you need help"),
  needHelp: Yup.string().when('radioButton', {
    is: 'Yes',
    then: (schema) => schema.required('Please provide details'),
    otherwise: (schema) => schema.notRequired(),
  }),
  additional: Yup.string(),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
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
          <textarea
            {...register("keyUpdate")}
            placeholder="Enter your response..."
            className="w-full px-4 py-2 bg-[#444] border-[#444] focus:border-[#007bff] text-white rounded-md"
            rows={4}
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
          <textarea
            {...register("summary")}
            placeholder="Enter your response..."
            className="w-full px-4 py-2 bg-[#444] border-[#444] focus:border-[#007bff] text-white rounded-md"
            rows={4}
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
          <textarea
            {...register("upComming")}
            placeholder="Enter your response..."
            className="w-full px-4 py-2 bg-[#444] border-[#444] focus:border-[#007bff] text-white rounded-md"
            rows={4}
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
            <textarea
              {...register("needHelp")}
              placeholder="Enter your response..."
              className="w-full px-4 py-2 bg-[#444] border-[#444] focus:border-[#007bff] text-white rounded-md"
              rows={4}
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
          <textarea
            {...register("additional")}
            placeholder="Enter your message..."
            className="w-full px-4 py-2 bg-[#444] border-[#444] focus:border-[#007bff] text-white rounded-md"
            rows={4}
          />
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
    </div>
  );
};

export default Form;
