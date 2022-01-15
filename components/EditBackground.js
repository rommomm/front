import api from "../libs/api";

import React, { useCallback, useState } from "react";
import { convertToBase64 } from "../helpers/convertToBase64";

function EditBackground() {
  const [background, setBackground] = useState("");
  const [backgroundData, setBackgroundData] = useState("");

  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBackground(base64);
    setBackgroundData(file);
  }, []);

  async function onSubmit() {
    try {
      const formData = new FormData();
      formData.append("profile_background", backgroundData);
      const response = await api.post("/profile/background", formData);
      console.log(`response`, response);
    } catch (error) {
      console.log(`error`, error);
    }
  }
  async function onRemove() {
    try {
      const response = await api.delete("/profile/background");
      console.log(`response`, response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  return (
    <div className="flex flex-col">
      <input type="file" name="avatar" onChange={handleCreateBase64} />
      <button
        onClick={onSubmit}
        className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow"
      >
        Upload background
      </button>
      <img src={background} />
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
