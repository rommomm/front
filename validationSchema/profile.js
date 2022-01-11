import * as Yup from "yup";

export const profileValidationSchema = Yup.object({
  first_name: Yup.string()
    .min(10, "* Too Short!")
    .max(255, "* Too Long!")
    .required("* Content is required"),
  last_name: Yup.string()
    .min(10, "* Too Short!")
    .max(255, "* Too Long!")
    .required("* Content is required"),
});
