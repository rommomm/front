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
    login: "",
    password: "",
  };

  const handleErrors = (errors) => {
    const _errors = {};
    const errorEntries = Object.entries(errors);
    errorEntries.forEach((err) => {
      _errors[err[0]] = err[1];
    });
    return _errors;
  };

  function handleFormSubmit(values, actions) {
    console.log(actions);
    api
      .post("/login", values)
      .then((response) => {
        Cookies.set("token", response.data.token);
        return api.get("/auth/me");
      })
      .then((response) => {
        Cookies.set("user", JSON.stringify(response.data));
        setUser(response.data);
        router.push("/");
      })
      .catch((error) => {
        const errors = handleErrors(error);
        actions.setErrors(errors);
        console.log(error);
      });
  }
  const formValidationSchema = Yup.object({
    login: Yup.string().required("Email or username is required"),
    password: Yup.string().required("Password is required"),
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
                      <Link href="/register">
                        <a className="no-underline border-blue text-blue hover:underline">
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
