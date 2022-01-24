import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import router from "next/router";
import { signInValidationSchema } from "../validationSchema/signIn";
import { handleErrors } from "../helpers/handleError";
import AuthLayout from "../components/AuthLayout";
import { useSignInMutation } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import { message } from "antd";

function SignIn() {
  const [signIn, { error }] = useSignInMutation();

  async function handleFormSubmit(values) {
    try {
      const response = await signIn(values);
      Cookies.set("token", response.data.token);
      message.success("Success");
      router.push("/");
    } catch (err) {
      throw err;
    }
  }
  const formInitialSchema = {
    login: "",
    password: "",
  };

  return (
    <AuthLayout>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
          <div className="bg-white  px-6 py-8 rounded border text-black w-full">
            <h1 className="mb-5 text-2xl text-center">Sign in</h1>
            <div className="col-md-8 offset-md-2">
              <Formik
                errors={handleErrors(error && error.errors)}
                initialValues={formInitialSchema}
                validationSchema={signInValidationSchema}
                onSubmit={handleFormSubmit}
              >
                <Form>
                  <div className="col-md-12 mt-4">
                    <span>Email or username</span>

                    <Field
                      type="text"
                      name="login"
                      className="block border border-black w-full p-3 rounded mb-4"
                    />

                    <p className=" text-sm pl-4 text-rose-500 text-red-600	">
                      <ErrorMessage name="login" />
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
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="text-grey-dark mt-6 text-center ">
                    <Link href="/sign-up">
                      <a className="no-underline border-blue text-blue hover:underline">
                        Register
                      </a>
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignIn;
