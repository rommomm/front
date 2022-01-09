import * as Yup from "yup";

export const formValidationSchema = Yup.object({
  content: Yup.string()
    .min(10, "* Too Short!")
    .max(255, "* Too Long!")
    .required("* Content is required"),
});
