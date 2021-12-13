import React, { useState } from "react";

function AddPostForm({ onCreate }) {
  const [content, setContent] = useState("");

  const handleCreate = () => {
    onCreate(content);
    setContent("");
  };

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
            className="bg-blue-400 rounded-lg px-4 py-1.5 shadow-md"
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
