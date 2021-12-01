import React, { useState } from "react";
function Post({ post, onDeletePost, onUpdatePost }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(post.text);

  function handleUpdatePost() {
    const newPost = { ...post, text: value };
    onUpdatePost(newPost);
    setEdit(false);
  }

  return (
    <tr>
      <td>{post.id}</td>
      {edit ? (
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      ) : (
        <td>{post.text}</td>
      )}

      {edit ? (
        <button onClick={handleUpdatePost}>Save</button>
      ) : (
        <button onClick={() => onDeletePost(post.id)}>Delete</button>
      )}

      <button onClick={() => setEdit(!edit)}>{edit ? "Cancel" : "Edit"}</button>
    </tr>
  );
}

export default Post;
