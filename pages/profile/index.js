import Sidebar from "../components/Sidebar";
import Head from "next/dist/shared/lib/head";
import PostsUser from "../components/PostUser";
import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Profile(initialUser) {
  const [userInfo, setUserInfo] = useState(initialUser);

  return (
    <>
      <div className="">
        <Head>
          <title>
            {userInfo.initialUser.first_name} {userInfo.initialUser.last_name}
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className=" min-h-screen flex w-full mx-auto">
          <Sidebar />
          <div className="border-black border-l border-r w-full max-w-screen-md	">
            <UserHeader userInfo={userInfo} />
            <AddPostForm />
            <PostsUser />
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:8000/api/user/3");
  console.log(response.data);
  return { props: { initialUser: response.data } };
}

export default Profile;
