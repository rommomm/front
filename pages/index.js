import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";

function App({ postsResponse = [] }) {
  const [posts, setPosts] = useState(postsResponse);

  return (
    <div className="block">
      <div className="tablePost">
        <AddPost posts={posts} setPosts={setPosts} />
        <PostList posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
}

App.getInitialProps = async (ctx) => {
  const response = await axios.get("http://localhost:8000/api/posts");

  return { postsResponse: response.data };
};

export default App;
