import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import GuestBanner from "../components/GuestBanner";
import UserDropDown from "./UserDropDown";
import { Spin } from "antd";
import { useSelector } from "react-redux";

function Layout({ children, title }) {
  const { isLoading } = useSelector(({ posts }) => posts);
  const { isLoggedIn, user } = useSelector(({ auth }) => auth);

  return (
    <div>
      {isLoading ? (
        <div className=" fixed inset-1/2 ">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <div>
          <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="min-h-screen flex max-w-[1500px] mx-auto">
            <Sidebar />
            <div className="fixed bottom-0 h-16">
              {isLoggedIn && user && <UserDropDown />}
            </div>
            {children}
            {!isLoggedIn && <GuestBanner />}
          </main>
        </div>
      )}
    </div>
  );
}

export default Layout;
