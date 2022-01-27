import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import EditBackground from "./EditBackground";
import {
  useRemoveBackgroundMutation,
  useUploadBackgroundMutation,
} from "../redux/profile/profileApi";
import { message } from "antd";
import useAuthMe from "../hooks/useAutMe";

function EditBackgroundModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const { data: user, refetch } = useAuthMe();
  const [uploadBackground] = useUploadBackgroundMutation();
  const [removeBackground] = useRemoveBackgroundMutation();

  async function handleUploadBackground(e) {
    try {
      const formData = new FormData();
      formData.append("profile_background", file);
      await uploadBackground(formData);
      message.success("Success");
      refetch();
      setIsModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleRemoveAvatar = async () => {
    await removeBackground();
    refetch();
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
          disabled={!user.data.profile.profile_background}
          onClick={handleRemoveAvatar}
          className="m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow hover:bg-red-300 focus:outline-none disabled:opacity-50"
          tabindex="-1"
        >
          Remove background
        </button>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        closable={false}
        maskClosable={true}
        width="275px"
        okText="Save"
        onOk={handleUploadBackground}
      >
        <EditBackground onPreviewUpload={handlePreviewUpload} />
      </Modal>
    </>
  );
}

export default EditBackgroundModal;
