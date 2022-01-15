import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import Map from "./Map";
import api from "../libs/api";

function EditLocation() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  async function onRemove() {
    try {
      const locatoin = { user_location: null };
      const response = await api.put("/profile/update", locatoin);
      console.log(`response`, response);
    } catch (error) {
      console.log(`error`, error);
    }
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
      >
        <Map />
      </Modal>
    </>
  );
}

export default EditLocation;
