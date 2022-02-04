import Cookies from "js-cookie";
import React from "react";
import EditAvatarModal from "../components/EditAvatarModal";
import EditBackgroundModal from "../components/EditBackgroundModal";
import EditLocation from "../components/EditLocation";
import EditUserInfo from "../components/EditUserInfo";
import Layout from "../components/Layout";
import ProfilePreview from "../components/ProfilePreview";

function Settings() {
  return (
    <Layout title="Settings page">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          Settings
        </div>
        <div className="border-black border-l border-r w-full max-w-screen-md	border-b">
          <EditUserInfo />
          <div className="pl-4 m-2  flex justify-around  flex-wrap">
            <EditAvatarModal />
            <EditBackgroundModal />
            <EditLocation />
            <ProfilePreview />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  if (!ctx.req.cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}

export default Settings;
