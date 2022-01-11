import React from "react";

function EditLocation() {
  return (
    <div className="flex flex-col">
      <button className=" m-2 bg-blue-300 hover:bg-blue-400 text-gray-800  py-2 px-7 border-gray-400 rounded shadow">
        Location
      </button>
      <button className=" m-2 bg-red-300 hover:bg-red-400 text-gray-800 py-2 px-7 border-gray-400 rounded shadow">
        Remove Location
      </button>
    </div>
  );
}

export default EditLocation;
