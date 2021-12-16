import { Fragment, useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../libs/api";
import Cookies from "js-cookie";
import UserContext from "../../components/UserContext";
import Link from "next/link";
import router from "next/router";

const RegisterForm = () => {
  const { setUser } = useContext(UserContext);
  const formInitialSchema = {
    email: "",
    password: "",
  };

  function handleFormSubmit(values) {
    api
      .post("/login", values)
      .then((response) => {
        setUser(response.data.user);
        Cookies.set("token", response.data.token);
        Cookies.set("user", JSON.stringify(response.data.user));
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const formValidationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
          <div className="bg-white  px-6 py-8 rounded border text-black w-full">
            <h1 className="mb-5 text-2xl text-center">Sign in</h1>
            <Fragment>
              <div className="col-md-8 offset-md-2">
                <Formik
                  initialValues={formInitialSchema}
                  validationSchema={formValidationSchema}
                  onSubmit={(values) => handleFormSubmit(values)}
                >
                  <Form>
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
                      <button
                        type="submit"
                        className="w-full bg-blue-400 rounded-lg px-4 py-3 shadow-md"
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="text-grey-dark mt-6 text-center ">
                      <Link href="/login">
                        <a className="no-underline border-b border-blue text-blue">
                          Register
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
    </div>
  );
};

export default RegisterForm;
