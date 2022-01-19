import React, { useCallback, useState } from "react";
import { convertToBase64 } from "../helpers/convertToBase64";
import { useDispatch } from "react-redux";
import { removeAvatar, uploadAvatar } from "../redux/profile/profileSlice";

function EditAvatar() {
  const [avatar, setAvatar] = useState("");
  const [avatarData, setAvatarData] = useState("");

  const dispatch = useDispatch();

  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setAvatar(base64);
    setAvatarData(file);
    e.target.value = "";
  }, []);

  function onSubmit() {
    const formData = new FormData();
    formData.append("profile_photo", avatarData);
    dispatch(uploadAvatar(formData));
  }

  const onRemove = async () => {
    dispatch(removeAvatar());
  };

  return (
    <div className="flex flex-col ">
      <input
        type="file"
        name="avatar"
        onChange={handleCreateBase64}
        accept="image/png"
      />
      <button
        onClick={onSubmit}
        className=" m-2 bg-blue-300 hover:bg-blue-400  py-2 px-7 border-gray-400 rounded shadow"
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
