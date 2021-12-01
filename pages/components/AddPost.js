import React, { useState } from "react";
import axios from "axios";

function AddPost({ post, setPost }) {
  const [text, setText] = useState("");

  const handleSavePost = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/posts`, {
        text,
      });
      setPost([...post, response.data]);
    } catch (e) {
      console.log(e);
    }
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSavePost}>Save</button>
    </div>
  );
}

export default AddPost;
