import * as Yup from "yup";

export const profileValidationSchema = Yup.object({
  first_name: Yup.string().min(3, "* Too Short!").max(50, "* Too Long!"),
  last_name: Yup.string().min(3, "* Too Short!").max(50, "* Too Long!"),
});
