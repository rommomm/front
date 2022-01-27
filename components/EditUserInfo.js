import { Formik } from "formik";
import React from "react";
import { profileValidationSchema } from "../validationSchema/profile";
import EditUserInfoForm from "./EditUserInfoForm";
import { useUpdateProfileMutation } from "../redux/profile/profileApi";
import { message } from "antd";
import useAuthMe from "../hooks/useAutMe";

function EditUserInfo() {
  const { data: user, refetch } = useAuthMe();
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

  const formInitialValue = {
    first_name: user.data.first_name,
    last_name: user.data.last_name,
  };

  if (!user) {
    return null;
  }

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
