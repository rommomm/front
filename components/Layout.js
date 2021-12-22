import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import api from "../libs/api";
import useSWR from "swr";
import UserContext from "./UserContext";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#000] min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}

export default Layout;
