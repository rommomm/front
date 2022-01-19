import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileValidationSchema } from "../validationSchema/profile";
import { updateProfile } from "../redux/profile/profileSlice";
import EditUserInfoForm from "./EditUserInfoForm";

function EditUserInfo() {
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  function handleSave(values) {
    dispatch(updateProfile(values));
  }

  if (!user) {
    return null;
  }
  const formInitialValue = {
    first_name: user.first_name,
    last_name: user.last_name,
  };

  return (
    <div className="border-b border-black pb-4">
      <div className="w-5/6 m-auto pt-5">
        <Formik
          enableReinitialize={false}
          initialValues={formInitialValue}
          validationSchema={profileValidationSchema}
          onSubmit={(values) => handleSave(values)}
        >
          {({ values }) => <EditUserInfoForm values={values} />}
        </Formik>
      </div>
    </div>
  );
}

export default EditUserInfo;
