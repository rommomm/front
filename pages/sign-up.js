import { Formik } from "formik";
import { signUpValidationSchema } from "../validationSchema/signUp";
import AuthLayout from "../components/AuthLayout";
import { useSignUpMutation } from "../redux/auth/authApi";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  const [signUp, { error, isSuccess }] = useSignUpMutation();

  async function handleFormSubmit(values) {
    try {
      await signUp(values);
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
    <AuthLayout>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
          <div className="bg-white  px-6 py-8 rounded border text-black w-full">
            <h1 className="mb-5 text-2xl text-center">Sign up</h1>

            <div className="col-md-8 offset-md-2">
              <Formik
                initialValues={formInitialValue}
                validationSchema={signUpValidationSchema}
                onSubmit={handleFormSubmit}
              >
                {(props) => {
                  return (
                    <SignUpForm
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

export default SignUp;
