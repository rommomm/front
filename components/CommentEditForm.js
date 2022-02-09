import { useFormik } from "formik";
import React from "react";
import { commentValidationSchema } from "../validationSchema/comment";
import MentionInput from "./MentionInput";

function CommentEditForm({ value, onSave, isLoggedIn, editMode, setEditMode }) {
  const formik = useFormik({
    initialValues: {
      content: value,
    },

    validationSchema: commentValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      onSave(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <div className=" w-full border-black">
      <div className="col-md-8 offset-md-2">
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <MentionInput
            rows={4}
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
          />
          {formik.errors.content ? (
            <div className="text-danger text-red-500">
              {formik.errors.content}
            </div>
          ) : null}
          <div className="flex justify-end pt-2.5 pr-2 pb-2">
            {isLoggedIn && (
              <div className="icon group flex flex col">
                <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">
                  {editMode && <button type="submit">Save</button>}
                </div>
                <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <button onClick={() => setEditMode(!editMode)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentEditForm;
