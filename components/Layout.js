import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import GuestBanner from "../components/GuestBanner";
import UserDropDown from "./UserDropDown";
import { useRouter } from "next/router";
import useAuthMe from "../hooks/useAutMe";
import Loader from "./Loader";

function Layout({ children, title }) {
  const { data: user, isSuccess: isLoggedIn } = useAuthMe();

  return (
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
  );
}

export default Layout;
