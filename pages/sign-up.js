import { Fragment } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import router from "next/router";
import { signUpValidationSchema } from "../validationSchema/signUp";
import { handleErrors } from "../helpers/handleError";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/auth/authSlice";
import AuthLayout from "../components/AuthLayout";
import { useSignUpMutation } from "../redux/auth/authApi";
import { message } from "antd";

const SignUp = () => {
  const [signUp, { error }] = useSignUpMutation();
  const dispatch = useDispatch();
  // const { errors } = useSelector(({ user }) => user);

  async function handleFormSubmit(values) {
    try {
      await signUp(values);
      message.success("Success");
      router.push("/sign-in");
    } catch (err) {
      throw err;
    }
  }

  const formInitialValue = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
        <div className="bg-white  px-6 py-8 rounded border text-black w-full">
          <h1 className="mb-5 text-2xl text-center">Sign up</h1>
          <Fragment>
            <div className="col-md-8 offset-md-2">
              <Formik
                errors={handleErrors(error && error.errors)}
                initialValues={formInitialValue}
                validationSchema={signUpValidationSchema}
                onSubmit={handleFormSubmit}
              >
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
              </Formik>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
