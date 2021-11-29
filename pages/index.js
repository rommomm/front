import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPost] = useState([]);
  const [text, setText] = useState("");
  const [postId, setPostId] = useState(null);

  function saveData() {
    fetch(`http://localhost:8000/api/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((res) => {
        setPost([...posts, res]);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);
  function getPosts() {
    fetch("http://localhost:8000/api/posts").then((result) => {
      result.json().then((resp) => {
        setPost(resp);
        setText(resp[0].text);
        setPostId(resp[0].id);
      });
    });
  }

  function deletePost(id) {
    fetch(`http://localhost:8000/api/posts/${id}`, { method: "delete" }).then(
      (res) => {
        setPost(posts.filter((p) => p.id !== id));
      }
    );
  }
  function selectPost(id) {
    const selectedPost = posts.find((post) => post.id === id);
    let item = selectedPost;
    setText(item.text);
    setPostId(item.id);
  }
  function updatePost() {
    fetch(`http://localhost:8000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then((result) => {
      result.json().then((resp) => {
        getPosts();
      });
    });
  }
  return (
    <div class="block">
      <div class="tablePost">
        <div>
          <h1>ADD POST </h1>
          <input
            type="text"
            value={text}
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => saveData()}>Add</button>
          <button onClick={updatePost}>Update Post</button>
        </div>
        <br />
        <table border="1" style={{ float: "left" }}>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Text</td>
            </tr>
            {posts.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.text}</td>
                <td>
                  <button onClick={() => deletePost(item.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => selectPost(item.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
