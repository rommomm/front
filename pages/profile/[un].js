import Sidebar from "../../components/Sidebar";
import Head from "next/dist/shared/lib/head";
import AddPostForm from "../../components/AddPostForm";
import UserHeader from "../../components/UserHeader";
import React, { useState, useContext } from "react";
import PostUserList from "../../components/PostUserList";
import api from "../../libs/api";
import UserContext from "../../components/UserContext";
import Layout from "../../components/Layout";

function Profile({ userPost = [], author }) {
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

  const handleSavePost = async (content) => {
    try {
      const response = await api.post(`/posts`, {
        content,
      });
      const newPost = { ...response.data.data };
      setPosts([newPost, ...posts]);
    } catch (e) {
      console.log(e);
    }
  };

  const showAddPost =
    isLoggedIn && author && userInfo && author.id === userInfo.id;

  return (
    <Layout title={author.first_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader userInfo={author} />

        {showAddPost && (
          <AddPostForm onCreate={handleSavePost} userInfo={author} />
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
  const author = await api.get(`/users/${ctx.params.un}`);
  const response = await api.get(`users/${author.data.data.user_name}/posts`);

  const posts = response.data.map((post) => ({
    ...post,
    author: author.data.data,
  }));
  return {
    props: { userPost: posts, author: author.data.data },
  };
}

export default Profile;
