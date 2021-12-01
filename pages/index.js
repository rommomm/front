import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";

function App() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios.get(`http://localhost:8000/api/posts/`).then((res) => {
      setPost(res.data);
    });
  }

  return (
    <div className="block">
      <div className="tablePost">
        <AddPost post={post} setPost={setPost} />
        <PostList post={post} setPost={setPost} />
      </div>
    </div>
  );
}

export default App;
