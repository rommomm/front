import api from "../libs/api";

import React, { useCallback, useState } from "react";
import { convertToBase64 } from "../helpers/convertToBase64";
import {
  removeBackground,
  uploadBackground,
} from "../redux/profile/profileSlice";
import { useDispatch } from "react-redux";

function EditBackground() {
  const [background, setBackground] = useState("");
  const [backgroundData, setBackgroundData] = useState("");
  const dispatch = useDispatch();

  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBackground(base64);
    setBackgroundData(file);
  }, []);

  function onSubmit() {
    const formData = new FormData();
    formData.append("profile_background", backgroundData);
    dispatch(uploadBackground(formData));
  }
  const onRemove = async () => {
    dispatch(removeBackground());
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        name="avatar"
        onChange={handleCreateBase64}
        accept="image/png"
      />
      <button
        onClick={onSubmit}
        className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow"
      >
        Upload background
      </button>
      <button
        onClick={onRemove}
        className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
      >
        Remove background
      </button>
    </div>
  );
}

export default EditBackground;
