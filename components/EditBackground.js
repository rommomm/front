import React from "react";
import {
  removeBackground,
  uploadBackground,
} from "../redux/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

function EditBackground() {
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  function handleUploadBackground(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profile_background", file);
    dispatch(uploadBackground(formData));
  }

  const handleRemoveBackground = async () => {
    dispatch(removeBackground());
  };
  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <input
        type="file"
        name="avatar"
        onChange={handleUploadBackground}
        accept="image/png"
      />

      <button
        disabled={!user.profile.profile_background}
        onClick={handleRemoveBackground}
        className="m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow hover:bg-red-300 focus:outline-none disabled:opacity-50"
        tabindex="-1"
      >
        Remove background
      </button>
    </div>
  );
}

export default EditBackground;
