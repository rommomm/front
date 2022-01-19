import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React, { useState, useContext } from "react";
import PostsList from "../components/PostsList";
import UserContext from "../components/UserContext";
import Layout from "../components/Layout";
import API from "../api";

function Profile({ userPost = [], author }) {
  const [posts, setPosts] = useState(userPost);
  const { isLoggedIn, user: userInfo } = useContext(UserContext);

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

  const showAddPost =
    isLoggedIn && author && userInfo && author.id === userInfo.id;

  return (
    <Layout title={author.first_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader userInfo={author} posts={posts} />
        {showAddPost && (
          <AddPostForm onCreate={handleSavePost} userInfo={author} />
        )}
        <PostsList
          posts={posts}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const author = await API.profile.getUser(ctx.params.username);
  const response = await API.posts.getUserPosts(author.data.user_name);

  const posts = response.map((post) => ({
    ...post,
    author: author.data,
  }));
  return {
    props: { userPost: posts, author: author.data },
  };
}

export default Profile;
