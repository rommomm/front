import React from "react";
import { useFormik } from "formik";
import { postValidationSchema } from "../validationSchema/post";
import MentionInput from "./MentionInput";

function AddPostForm({ onCreate }) {
  const formik = useFormik({
    initialValues: {
      content: "",
    },

    validationSchema: postValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      onCreate(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <div className=" w-full border-black border-b ">
      <div className="col-md-8 offset-md-2">
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <MentionInput
            rows={6}
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
          />
          {formik.errors.content ? (
            <div className="text-danger text-red-500">
              {formik.errors.content}
            </div>
          ) : null}
          <div className="flex justify-end pt-2.5 pr-2 pb-2">
            <div>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPostForm;
