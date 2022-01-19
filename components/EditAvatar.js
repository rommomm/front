import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAvatar, uploadAvatar } from "../redux/profile/profileSlice";

function EditAvatar() {
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  function handleUploadAvatar(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profile_photo", file);
    dispatch(uploadAvatar(formData));
  }

  const handleRemoveAvatar = async () => {
    dispatch(removeAvatar());
  };

  return (
    <div className="flex flex-col ">
      <input
        type="file"
        name="avatar"
        onChange={handleUploadAvatar}
        accept="image/png"
      />
      <button
        disabled={!user.profile.profile_photo}
        onClick={handleRemoveAvatar}
        className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow"
      >
        Remove avatar
      </button>
    </div>
  );
}

export default EditAvatar;
