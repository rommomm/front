import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
  login: Yup.string().required("Email or username is required"),
  password: Yup.string().required("Password is required"),
});
