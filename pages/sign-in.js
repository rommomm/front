import React, { useEffect } from "react";
import { Formik } from "formik";
import { signInValidationSchema } from "../validationSchema/signIn";
import AuthLayout from "../components/AuthLayout";
import {
  authApi,
  useAuthMeQuery,
  useSignInMutation,
} from "../redux/auth/authApi";
import Cookies from "js-cookie";
import SignInForm from "../components/SignInForm";

function SignIn() {
  const [signIn, { error, isSuccess }] = useSignInMutation();
  async function handleFormSubmit(values) {
    try {
      const response = await signIn(values);
      Cookies.set("token", response.data.token);
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
                initialValues={formInitialSchema}
                validationSchema={signInValidationSchema}
                onSubmit={handleFormSubmit}
              >
                {(props) => {
                  return (
                    <SignInForm
                      {...props}
                      error={error}
                      isSuccess={isSuccess}
                    />
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignIn;
