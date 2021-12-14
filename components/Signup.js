import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import Link from "next/link";
import router from "next/router";
import api from "../libs/api";
import Cookies from "js-cookie";
import UserContext from "../components/UserContext";

export function Signup1() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    userName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const { setUser } = useContext(UserContext);

  function signUp() {
    api
      .post("/register", {
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
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

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        userNmae: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <div className="border w-1/3">
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form className="border">
            <TextField
              value={firstName}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="firstName"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder=""
            />
            <TextField
              value={lastName}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="lastName"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              placeholder=""
            />
            <TextField
              value={userName}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="userName"
              label="User Name"
              onChange={(e) => setUserName(e.target.value)}
              placeholder=""
            />
            <TextField
              value={email}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
            <TextField
              value={password}
              type="password"
              className="block border border-black w-full p-3 rounded mb-4"
              name="password"
              label="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <TextField
              value={passwordConfirmation}
              type="password"
              className="block border border-black w-full p-3 rounded mb-4"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder=""
              label="Confirm Password"
              name="confirmPassword"
            />
            <button
              onClick={signUp}
              type="submit"
              className="w-full bg-blue-400 rounded-lg px-4 py-3 shadow-md"
            >
              Sign Up
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              Reset
            </button>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
              <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
                <div className="bg-white  px-6 py-8 rounded border text-black w-full">
                  <h1 className="mb-5 text-2xl text-center">Sign up</h1>

                  <div className="text-grey-dark mt-6 items-center ">
                    <Link href="/login">
                      <a className="no-underline border-b border-blue text-blue">
                        Sign Up
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Signup1;
