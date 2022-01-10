import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React from "react";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import API from "../api";
import { withRedux } from "../redux";
import {
  getUserPosts,
  createPost,
  deletePost,
  updatePost,
} from "../redux/posts/actions";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { isLoggedIn, user } = useSelector(({ auth }) => auth);
  const { all: posts, author } = useSelector(({ posts }) => posts);
  const dispatch = useDispatch();

  const handleDeletePost = async (id) => {
    dispatch(deletePost(id));
  };

  const handleUpdatePost = async (id, updatedData) => {
    dispatch(updatePost(id, updatedData));
  };

  const handleSavePost = async (post) => {
    dispatch(createPost(post));
  };

  const showAddPost = isLoggedIn && author && author.id === user.id;

  return (
    <Layout title={author.first_name}>
      <div className="border-black border-l border-r w-full max-w-screen-md	">
        <UserHeader userInfo={author} posts={posts} />
        {showAddPost && <AddPostForm onCreate={handleSavePost} />}
        <PostsList
          posts={posts}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps = withRedux(async (ctx, store) => {
  await store.dispatch(getUserPosts(ctx));

  return {
    props: {},
  };
});
export default Profile;
