import React from "react";
import { ErrorMessage, Field, Form } from "formik";
import { useSelector } from "react-redux";
import { useAuthMeQuery } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import useAuthMe from "../hooks/useAutMe";

function EditUserInfoForm({ values }) {
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();
  const disable =
    values.first_name === user.data.first_name &&
    values.last_name === user.data.last_name;
  return (
    <div>
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
            disabled={disable}
            type="submit"
            className="bg-blue-200 hover:bg-blue-300 text-gray-800  py-2 px-7 border-gray-400 rounded shadow hover:bg-red-300 focus:outline-none disabled:opacity-50"
            tabindex="-1"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EditUserInfoForm;
