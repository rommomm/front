import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import Map from "./Map";
import api from "../libs/api";
import { updateProfile } from "../redux/profile/profileSlice";
import { useDispatch } from "react-redux";

function EditLocation() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  async function onRemove() {
    const locatoin = { user_location: null };
    dispatch(updateProfile(locatoin));
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="flex flex-col">
        <button
          onClick={showModal}
          className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
        >
          Location
        </button>
        <button
          onClick={onRemove}
          className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow"
        >
          Remove Location
        </button>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        closable={false}
        maskClosable={true}
        width="768px"
        footer={null}
      >
        <Map />
      </Modal>
    </>
  );
}

export default EditLocation;
