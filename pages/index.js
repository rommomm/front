import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import PostsList from "../components/PostsList";

function App({posts}) {
  const [posts, setPost] = useState(posts);
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

  async function deletePost(id) {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      setPost(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
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
          <button onClick={() => handleSavePost()}>Add</button>
        </div>
        <br />
        <table border="1" style={{ float: "left" }}>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Text</td>
              <td className="blocktext">Optional</td>
            </tr>
            <PostsList posts={posts} onDeletePost={deletePost} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

App.getInitialProps = async (ctx) => {
  const response = await axios.get(`http://localhost:8000/api/posts/`);

  return { posts: response.data };
};

export default App;
