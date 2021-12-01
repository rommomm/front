import React, { useState } from "react";
import axios from "axios";

function AddPost({ posts, setPosts }) {
  const [text, setText] = useState("");

  const handleSavePost = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/posts`, {
        text,
      });
      setPosts([...posts, response.data]);
    } catch (e) {
      console.log(e);
    }
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSavePost}>Create</button>
    </div>
  );
}

export default AddPost;
