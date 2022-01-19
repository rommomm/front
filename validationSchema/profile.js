import * as Yup from "yup";

export const profileValidationSchema = Yup.object({
  first_name: Yup.string()
    .min(3, "* Too Short!")
    .max(50, "* Too Long!")
    .required("* Is required"),
  last_name: Yup.string()
    .min(3, "* Too Short!")
    .max(50, "* Too Long!")
    .required("* Is required"),
});
