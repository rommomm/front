import { Button } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  // function handleCreate(values, actions) {
  //   onCreate(values);
  //   actions.resetForm();
  // }

  // const formInitialValues = {
  //   content: "",
  // };

  return (
    <div className=" w-full border-black border-b ">
      <div className="col-md-8 offset-md-2">
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <MentionInput
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
          />
          {formik.errors.content ? (
            <div className="text-danger">{formik.errors.content}</div>
          ) : null}
          <div className="flex justify-end pt-2.5 pr-2 pb-2">
            <div>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Create
              </button>
            </div>
          </div>
        </form>

        {/* <Formik
          initialValues={formInitialValues}
          validationSchema={postValidationSchema}
          onSubmit={handleCreate}
        >
          <Form className="w-full">
            <Field
              component="textarea"
              type="content"
              name="content"
              placeholder="Text"
              rows="5"
              className="resize-none bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full"
            />

            <div className="flex justify-between pt-2.5 pr-2 pb-2">
              <div>
                <p className=" text-sm pl-4 text-rose-500 text-red-600">
                  <ErrorMessage name="content" />
                </p>
              </div>
              <div>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Create
                </button>
              </div>
            </div>
          </Form>
        </Formik> */}
      </div>
    </div>
  );
}

export default AddPostForm;
