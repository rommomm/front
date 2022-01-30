import React, { useState } from "react";
import { updateProfile } from "../redux/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Map from "./Map";

function EditLocation() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  async function handleRemoveUserLocation() {
    const locatoin = { user_location: null };
    dispatch(updateProfile(locatoin));
  }

  const handleUpdate = () => {
    dispatch(updateProfile({ user_location: userLocation }));
  };

  const handlePreviewLocation = (location) => {
    setUserLocation(location);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          Location
        </button>
        <button
          disabled={!user.user_location}
          onClick={handleRemoveUserLocation}
          className="m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow hover:bg-red-300 focus:outline-none disabled:opacity-50"
          tabindex="-1"
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
        okText="Save"
        onOk={handleUpdate}
      >
        <Map handlePreviewLocation={handlePreviewLocation} />
      </Modal>
    </>
  );
}

export default EditLocation;
