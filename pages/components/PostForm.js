import React, { useState } from "react";
import axios from "axios";

function PostForm() {
  const [posts, setPost] = useState([]);
  const [text, setText] = useState("");

  const handleSavePost = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/posts`, {
        text,
      });
      setPost([...posts, response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form>
        <h1>ADD POST </h1>
        <input
          type="text"
          value={text}
          placeholder="Text"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => handleSavePost()}>Add</button>
      </form>
    </div>

    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={input}
    //       placeholder="Text"
    //       onChange={handleChanhe}
    //     />
    //     <button>Add</button>
    //   </form>
    // </div>
  );
}
export default PostForm;
