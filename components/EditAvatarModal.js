import React, { useState } from "react";
import {
  removeAvatar,
  updateProfile,
  uploadAvatar,
} from "../redux/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Map from "./Map";
import EditAvatar from "./EditAvatar";

function EditAvatarModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  function handleUploadAvatar(e) {
    console.log("file", file);
    const formData = new FormData();

    formData.append("profile_photo", file);
    dispatch(uploadAvatar(formData));
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleRemoveAvatar = async () => {
    dispatch(removeAvatar());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!user) {
    return null;
  }

  const handlePreviewUpload = (file) => {
    console.log("file", file);
    setFile(file);
  };

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
          disabled={!user.profile.profile_photo}
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
