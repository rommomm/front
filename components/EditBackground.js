import React from "react";

function EditBackground() {
  return (
    <div className="flex flex-col">
      <button className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow">
        Upload background
      </button>
      <button className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow">
        Remove background
      </button>
    </div>
  );
}

export default EditBackground;
