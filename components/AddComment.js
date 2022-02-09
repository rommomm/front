import { useFormik } from "formik";
import { commentValidationSchema } from "../validationSchema/comment";
import MentionInput from "./MentionInput";

function AddComment({ onCreate, post: postComment }) {
  const formik = useFormik({
    initialValues: {
      content: "",
    },

    validationSchema: commentValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      onCreate(postComment.id, values);
      formikHelpers.resetForm();
    },
  });

  return (
    <div className=" w-full border-black">
      <div className="col-md-8 offset-md-2">
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <MentionInput
            rows={5}
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
          />
          {formik.errors.content ? (
            <div className="text-danger text-red-500">
              {formik.errors.content}
            </div>
          ) : null}
          <div className="flex justify-end pt-2.5 pr-2 pb-2">
            <button
              type="submit"
              className="bg-blue-200 hover:bg-blue-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//   function handleCreate(values, actions) {
//     onCreate(postComment.id, values);
//     actions.resetForm();
//   }

//   const formInitialValue = {
//     content: "",
//   };

//   return (
//     <div className=" w-full m-auto border-b">
//       <div className="col-md-8 offset-md-2">
//         <Formik
//           initialValues={formInitialValue}
//           validationSchema={commentValidationSchema}
//           onSubmit={handleCreate}
//         >
//           <Form className="w-full">
//             <Field
//               component="textarea"
//               type="content"
//               name="content"
//               placeholder="Text"
//               rows="3"
//               className="resize-none bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full "
//             />

//             <div className="flex justify-between pt-2.5 pr-2 pb-2">
//               <div>
//                 <p className=" text-sm pl-4 text-rose-500 text-red-600	">
//                   <ErrorMessage name="content" />
//                 </p>
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="bg-blue-200 hover:bg-blue-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
//                 >
//                   Comment
//                 </button>
//               </div>
//             </div>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// }

export default AddComment;
