import Sidebar from "../components/Sidebar";
import Head from "next/dist/shared/lib/head";
import PostsUser from "../components/PostUser";
import AddPostForm from "../components/AddPostForm";
import UserHeader from "../components/UserHeader";
export default function Profile() {
  return <>
  <div className="">
      <Head>
        <title>Name User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className=" min-h-screen flex w-full mx-auto">
        <Sidebar />
        <div className="border-black border-l border-r w-full max-w-screen-md	">
          <UserHeader />
        <AddPostForm/>
        <PostsUser/>
        </div>
      </main>
    </div>

  </>;
}
