import React, { useState } from "react";
import axios from "axios";

function PostList({ post, setPost }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");

  function deletePost(id) {
    axios.delete(`http://localhost:8000/api/posts/${id}`).then(() => {
      setPost(post.filter((p) => p.id !== id));
    });
  }

  function editPost(id, text) {
    setEdit(id);
    setValue(text);
  }

  // function savePost() {
  //   axios.put(`http://localhost:8000/api/posts/${id}`, { value, edit });
  // }

  function updatePost() {
    axios.put(`http://localhost:8000/api/posts/${post.id}`, { edit, value });
  }

  return (
    <div>
      {post.map((item, i) => (
        <tr key={i}>
          {edit === item.id ? (
            <div>
              <input value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          ) : (
            <div>
              <td>{item.id}</td>
              <td>{item.text}</td>
            </div>
          )}

          {edit === item.id ? (
            <div>
              <button onClick={updatePost}>Save</button>
            </div>
          ) : (
            <div>
              <button onClick={() => deletePost(item.id)}>Delete</button>
              <button onClick={() => editPost(item.id, item.text)}>Edit</button>
            </div>
          )}
        </tr>
      ))}
    </div>
  );
}

export default PostList;
