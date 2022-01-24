import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileValidationSchema } from "../validationSchema/profile";
import { updateProfile } from "../redux/profile/profileSlice";
import EditUserInfoForm from "./EditUserInfoForm";
import { useAuthMeQuery } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import { useUpdateProfileMutation } from "../redux/profile/profileApi";
import { message, Spin } from "antd";
import useAuthMe from "../hooks/useAutMe";

function EditUserInfo() {
  const { data: user, isSuccess: isLoggedIn, refetch } = useAuthMe();
  const [updateProfile] = useUpdateProfileMutation();

  async function handleSave(values) {
    try {
      await updateProfile(values);
      message.success("Success");
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  }

  if (!user) {
    return null;
  }

  const formInitialValue = {
    first_name: user.data.first_name,
    last_name: user.data.last_name,
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
