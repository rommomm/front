import Sidebar from "../../components/Sidebar";
import Head from "next/dist/shared/lib/head";
import AddPostForm from "../../components/AddPostForm";
import UserHeader from "../../components/UserHeader";
import React, { useState, useContext } from "react";
import PostUserList from "../../components/PostUserList";
import api from "../../libs/api";
import UserContext from "../../components/UserContext";
import Layout from "../../components/Layout";

function Profile({ userPost = [], user }) {
  const [posts, setPosts] = useState(userPost);
  const { isLoggedIn, user: userInfo } = useContext(UserContext);

  async function handleDeletePost(id) {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePost(id, updatedData) {
    try {
      const response = await api.put(`/posts/${id}`, updatedData);

      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, ...response.data.data } : post
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  const handleSavePost = async (text) => {
    try {
      const response = await api.post(`/posts`, {
        text,
      });
      const newPost = { ...response.data, user };
      setPosts([newPost, ...posts]);
    } catch (e) {
      console.log(e);
    }
  };

  const showAddPost = isLoggedIn && user && userInfo && user.id === userInfo.id;

  return (
    <Layout title={user.first_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader userInfo={user} />

        {showAddPost && (
          <AddPostForm onCreate={handleSavePost} userInfo={user} />
        )}

        <PostUserList
          posts={posts}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
          onCreate={handleSavePost}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const user = await api.get(`/users/${ctx.params.un}`);
  const response = await api.get(`users/${user.data.user_name}/posts`);
  const posts = response.data.map((post) => ({
    ...post,
    user: user.data,
  }));
  return {
    props: { userPost: posts, user: user.data },
  };
}

export default Profile;
