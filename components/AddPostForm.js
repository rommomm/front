import React, { useState } from "react";

function AddPostForm({ onCreate }) {
  const [content, setContent] = useState("");
  function handleCreate() {
    onCreate(content);
    setContent("");
  }

  return (
    <div className=" w-full border-black border-b ">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Text"
        rows="4"
        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
      />
      <div className="flex justify-between pt-2.5 pr-2 pb-2">
        <div></div>
        <div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPostForm;
