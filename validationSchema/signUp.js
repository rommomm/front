import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  first_name: Yup.string()
    .min(3, "Must be 3 characters or less")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .min(3, "Must be 3 characters or less")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  user_name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
});
