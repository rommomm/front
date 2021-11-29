import React, { useEffect, useState } from "react";
import Link from "next/link";

function App() {
  const [posts, setPost] = useState([]);
  const [text, setText] = useState("");
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
    fetch("http://localhost:8000/api/posts")
      .then((res) => res.json())
      .then((res) => {
        setPost(res);
        setText(res[0].text);
      });
  }

  function deletePost(id) {
    fetch(`http://localhost:8000/api/posts/${id}`, { method: "delete" })
    .then(() => {
        setPost(posts.filter((p) => p.id !== id));
      }
    );
  }

  return (
    <div className="block">
      <div className="tablePost">
        <div>
          <h1>ADD POST </h1>
          <input
            type="text"
            value={text}
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => saveData()}>Add</button>
        </div>
        <br />
        <table border="1" style={{ float: "left" }}>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Text</td>
              <td className="blocktext">Optional</td>
            </tr>
            {posts.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.text}</td>
                <td>
                  <button onClick={() => deletePost(item.id)}>Delete</button>
                  <Link
                    href={{
                      pathname: "/post/[id]",
                      query: { id: item.id },
                    }}
                  >
                    <button>View</button>
                  </Link>
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
