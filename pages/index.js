import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

function App() {
  const [posts, setPost] = useState([]);
  const [text, setText] = useState("");

  const saveData = () => {
    axios
      .post(`http://localhost:8000/api/posts`, {
        text,
      })
      .then((res) => {
        setPost([...posts, res.data]);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios.get(`http://localhost:8000/api/posts/`).then((res) => {
      setPost(res.data);
    });
  }

  function deletePost(id) {
    axios.delete(`http://localhost:8000/api/posts/${id}`).then(() => {
      setPost(posts.filter((p) => p.id !== id));
    });
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
