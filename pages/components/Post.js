import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import axios from "axios";
import Link from "next/link";
import PostsList from "./PostListed";

function Post() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios.get(`http://localhost:8000/api/posts/`).then((res) => {
      setPost(res.data);
    });
  }

  async function deletePost(id) {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      setPost(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
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
  );
}

export default Post;
