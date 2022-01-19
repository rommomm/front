import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { postValidationSchema } from "../validationSchema/post";

function PostEditForm({ value, onSave, isLoggedIn, editMode, setEditMode }) {
  const formInitialValues = {
    content: value,
  };
  return (
    <div className="flex">
      <div className="w-full">
        <div className="col-md-8 offset-md-2">
          <Formik
            initialValues={formInitialValues}
            validationSchema={postValidationSchema}
            onSubmit={onSave}
          >
            <Form>
              <Field
                component="textarea"
                type="content"
                name="content"
                rows="4"
                className="resize-none border border-gray-700 bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-11/12 "
              />
              <div>
                <p className=" text-sm pl-4 text-rose-500 text-red-600 absolute	">
                  <ErrorMessage name="content" />
                </p>
              </div>
              <div className="flex justify-end pt-2.5 pr-2 pb-2">
                <div>
                  {isLoggedIn && (
                    <div className="icon group flex flex col">
                      <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">
                        {editMode && <button type="submit">Save</button>}
                      </div>
                      <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        <button onClick={() => setEditMode(!editMode)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default PostEditForm;
