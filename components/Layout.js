import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import GuestBanner from "../components/GuestBanner";
import UserContext from "./UserContext";

function Layout({ children, title }) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#000] min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        {children}
        {!isLoggedIn && <GuestBanner />}
      </main>
    </div>
  );
}

export default Layout;
