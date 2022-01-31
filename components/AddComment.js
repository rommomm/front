import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/comments/commentsApi";
import { useGetAllPostsQuery } from "../redux/posts/postApi";
import { commentValidationSchema } from "../validationSchema/comment";

function AddComment({ onCreate, post: postComment }) {
  function handleCreate(values, actions) {
    onCreate(postComment.id, values);
    actions.resetForm();
  }

  const formInitialValue = {
    content: "",
  };

  return (
    <div className=" w-full m-auto border-b">
      <div className="col-md-8 offset-md-2">
        <Formik
          initialValues={formInitialValue}
          validationSchema={commentValidationSchema}
          onSubmit={handleCreate}
        >
          <Form className="w-full">
            <Field
              component="textarea"
              type="content"
              name="content"
              placeholder="Text"
              rows="4"
              className="resize-none bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full "
            />

            <div className="flex justify-between pt-2.5 pr-2 pb-2">
              <div>
                <p className=" text-sm pl-4 text-rose-500 text-red-600	">
                  <ErrorMessage name="content" />
                </p>
              </div>
              <div>
                <button className="bg-blue-200 hover:bg-blue-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Comment
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddComment;
