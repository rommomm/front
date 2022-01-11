import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import Map from "./Map";
import { useJsApiLoader } from "@react-google-maps/api";
import AutocompleteLocation from "./AutocompleteLocation";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const libraries = ["places"];

const center = {
  lat: 47.922607468670684,
  lng: 35.15485298489101,
};
function EditLocation() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });
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
          className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
        >
          Location
        </button>
        <button className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow">
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
        <div>
          <AutocompleteLocation isLoaded={isLoaded} />
        </div>
        {isLoaded ? <Map center={center} /> : <h2>123123</h2>}
      </Modal>
    </>
  );
}

export default EditLocation;
