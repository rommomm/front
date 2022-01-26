import { message } from "antd";
import { ErrorMessage, Field, Form } from "formik";
import Link from "next/link";
import router from "next/router";
import React, { useEffect } from "react";
import { handleErrors } from "../helpers/handleError";
import { useSignUpMutation } from "../redux/auth/authApi";

function SignUpForm({ setErrors, error, isSuccess }) {
  useEffect(() => {
    if (error) {
      setErrors(handleErrors(error.errors));
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Success");
      router.push("/sign-in");
    }
  }, [isSuccess]);
  return (
    <Form>
      <div className="col-md-12 mt-4">
        <span>First name</span>

        <Field
          type="text"
          name="first_name"
          className="block border border-black w-full p-3 rounded mb-4"
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
          className="block border border-black w-full p-3 rounded mb-4"
        />

        <p className=" text-sm pl-4 text-rose-500 text-red-600	">
          <ErrorMessage name="last_name" />
        </p>
      </div>
      <div className="col-md-12 mt-4">
        <span>User name</span>

        <Field
          type="text"
          name="user_name"
          className="block border border-black w-full p-3 rounded mb-4"
        />

        <p className=" text-sm pl-4 text-rose-500 text-red-600	">
          <ErrorMessage name="user_name" />
        </p>
      </div>
      <div className="col-md-12 mt-4">
        <span>Email</span>

        <Field
          type="email"
          name="email"
          className="block border border-black w-full p-3 rounded mb-4"
        />

        <p className=" text-sm pl-4 text-rose-500 text-red-600	">
          <ErrorMessage name="email" />
        </p>
      </div>
      <div className="col-md-12 mt-4">
        <span>Password</span>

        <Field
          type="password"
          name="password"
          className="block border border-black w-full p-3 rounded mb-4"
        />

        <p className=" text-sm pl-4 text-rose-500 text-red-600	">
          <ErrorMessage name="password" />
        </p>
      </div>
      <div className="col-md-12 mt-4">
        <span>Password confirmation</span>

        <Field
          type="password"
          name="password_confirmation"
          className="block border border-black w-full p-3 rounded mb-4"
        />

        <p className=" text-sm pl-4 text-rose-500 text-red-600	">
          <ErrorMessage name="password_confirmation" />
        </p>
      </div>
      <div className="col-md-12 mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
        >
          Sign Up
        </button>
      </div>
      <div className="text-grey-dark mt-6 text-center ">
        <Link href="/sign-in">
          <a className="no-underline border-blue text-blue hover:underline">
            Sign In
          </a>
        </Link>
      </div>
    </Form>
  );
}

export default SignUpForm;
