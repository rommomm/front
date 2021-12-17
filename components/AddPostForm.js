import { Fragment, useContext, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";

function AddPostForm({ onCreate }) {
  const [content, setContent] = useState();

  function handleCreate(value) {
    onCreate(value.text);
    setContent("");
    NotificationManager.success("Post added");
  }

  const formValidationSchema = Yup.object({
    text: Yup.string()
      .min(10, "* Content must be at least 10 charaters")
      .max(255, "* Content must be at least 255 charaters")
      .required("* Content is required"),
  });

  const formInitialSchema = {
    text: "",
  };

  return (
    <div className=" w-full border-black border-b ">
      <Fragment>
        <div className="col-md-8 offset-md-2">
          <Formik
            initialValues={formInitialSchema}
            validationSchema={formValidationSchema}
            onSubmit={handleCreate}
          >
            <Form>
              <Field
                component="textarea"
                type="text"
                name="text"
                placeholder="Content"
                rows="5"
                className="resize-none bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
              />

              <div className="flex justify-between pt-2.5 pr-2 pb-2">
                <div>
                  <p className=" text-sm pl-4 text-rose-500 text-red-600	">
                    <ErrorMessage name="text" />
                  </p>
                </div>
                <div>
                  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Create
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </Fragment>
    </div>
  );
}

export default AddPostForm;
