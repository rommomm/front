import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import HeaderProfilePreview from "./HeaderProfilePreview";

function ProfilePreview() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="flex flex-col">
        <button
          onClick={showModal}
          className=" m-2 bg-green-300 hover:bg-green-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
        >
          Profile preview
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
        <HeaderProfilePreview />
      </Modal>
    </>
  );
}

export default ProfilePreview;
