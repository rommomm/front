import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import EditAvatar from "./EditAvatar";
import {
  useRemoveAvatarMutation,
  useUploadAvatarMutation,
} from "../redux/profile/profileApi";
import { message } from "antd";
import useAuthMe from "../hooks/useAutMe";

function EditAvatarModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const { data: user, refetch } = useAuthMe();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();

  const handleUploadAvatar = async (e) => {
    try {
      const formData = new FormData();
      formData.append("profile_photo", file);
      await uploadAvatar(formData);
      message.success("Success");
      refetch();
      setIsModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveAvatar = async () => {
    await removeAvatar();
    refetch();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePreviewUpload = (file) => {
    setFile(file);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col">
        <button
          onClick={showModal}
          className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
        >
          Upload avatar
        </button>
        <button
          disabled={!user.data.profile.profile_photo}
          onClick={handleRemoveAvatar}
          className="m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow hover:bg-red-300 focus:outline-none disabled:opacity-50"
          tabindex="-1"
        >
          Remove avatar
        </button>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        closable={false}
        maskClosable={true}
        width="275px"
        okText="Save"
        onOk={handleUploadAvatar}
      >
        <EditAvatar onPreviewUpload={handlePreviewUpload} />
      </Modal>
    </>
  );
}

export default EditAvatarModal;
