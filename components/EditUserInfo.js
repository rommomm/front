import { Input } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileValidationSchema } from "../validationSchema/profile";
import api from "../libs/api";

function EditUserInfo() {
  const { user } = useSelector(({ auth }) => auth);
  async function handleSave(values) {
    try {
      if (!values.first_name) {
        values.first_name = user.first_name;
      }
      if (!values.last_name) {
        values.last_name = user.last_name;
      }
      const response = await api.put("/profile/update", values);
      console.log(`response`, response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  const formInitialValue = {
    first_name: "",
    last_name: "",
  };
  return (
    <div className="border-b border-black pb-4">
      <div className="w-5/6 m-auto pt-5">
        <Formik
          enableReinitialize={false}
          initialValues={({ first_name: "" }, { last_name: "" })}
          validationSchema={profileValidationSchema}
          onSubmit={handleSave}
        >
          <Form>
            <div className="col-md-12 mt-4">
              <span>First name</span>
              <Field
                type="text"
                name="first_name"
                className="block border border-black w-full p-2 rounded mb-4"
              />

              <p className=" text-sm pl-4 text-rose-500 text-red-600	">
                <ErrorMessage name="first_name" />
              </p>
            </div>
            <div className="col-md-12 mt-4">
              <span>Last name</span>

              <Field
                type="text"
                name="last_name"
                className="block border border-black w-full p-2 rounded mb-4"
              />

              <p className=" text-sm pl-4 text-rose-500 text-red-600	">
                <ErrorMessage name="last_name" />
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-200 hover:bg-blue-300 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default EditUserInfo;
