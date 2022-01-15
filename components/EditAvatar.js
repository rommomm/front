import React, { useCallback, useState } from "react";
import api from "../libs/api";
import { convertToBase64 } from "../helpers/convertToBase64";

function EditAvatar() {
  const [avatar, setAvatar] = useState("");
  const [avatarData, setAvatarData] = useState("");
  console.log(`avatarData`, avatarData);
  console.log(`avatar`, avatar);
  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setAvatar(base64);
    setAvatarData(file);
    e.target.value = "";
  }, []);

  async function submit() {
    try {
      const formData = new FormData();
      formData.append("profile_photo", avatarData);
      const response = await api.post("/profile/avatar", formData);
      console.log(`response`, response);
    } catch (error) {
      console.log(`error`, error);
    }
  }
  async function onRemove() {
    try {
      const response = await api.delete("/profile/avatar");
      console.log(`response`, response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  return (
    <div className="flex flex-col">
      <input type="file" name="avatar" onChange={handleCreateBase64} />
      <button
        onClick={submit}
        className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow"
      >
        Upload avatar
      </button>
      <img src={avatar} />
      <button
        onClick={onRemove}
        className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
      >
        Remove avatar
      </button>
    </div>
  );
}

export default EditAvatar;
