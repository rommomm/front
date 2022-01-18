import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import React from "react";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";
import { withRedux } from "../redux";
import {
  getUserPosts,
  createPost,
  deletePost,
  updatePost,
} from "../redux/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { isLoggedIn, user } = useSelector(({ user }) => user);
  const { posts, author } = useSelector(({ all }) => all.posts);
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
  const data = store.getState();
  console.log(`store.getState()`, store.getState());
  // console.log(`data`, data.all.posts.author);
  if (!data.all.posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
});
export default Profile;
