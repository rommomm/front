import React, { useContext, useState } from "react";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import UserContext from "../components/UserContext";
import AddPostForm from "../components/AddPostForm";
import API from "../api";

function App({ initialPosts = [] }) {
  const { isLoggedIn } = useContext(UserContext);
  const [posts, setPosts] = useState(initialPosts);

  async function handleDeletePost(id) {
    try {
      await API.posts.DeletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePost(id, updatedData) {
    try {
      const response = await API.posts.updatePost(id, updatedData);
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, ...response.data } : post
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSavePost(content) {
    try {
      const response = await API.posts.createPost({ content });
      const newPost = { ...response.data };
      setPosts([newPost, ...posts]);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Layout title="Home page">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          Explore
        </div>
        <div className="border-black border-l border-r w-full max-w-screen-md	">
          {isLoggedIn && <AddPostForm onCreate={handleSavePost} />}

          <PostsList
            posts={posts}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await API.posts.getAllPosts();

  return { props: { initialPosts: response.data } };
}
export default App;
