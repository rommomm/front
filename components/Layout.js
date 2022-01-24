import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import GuestBanner from "../components/GuestBanner";
import UserDropDown from "./UserDropDown";
import { Spin } from "antd";
import { useAuthMeQuery } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useAuthMe from "../hooks/useAutMe";

function Layout({ children, title }) {
  const router = useRouter();
  // const {
  //   data: user,
  //   isLoading,
  //   isSuccess: isLoggedIn,
  //   refetch,
  //   isFetching,
  //   isUninitialized,
  // } = useAuthMeQuery(null, {
  //   skip: !(Cookies && Cookies.get("token")),
  // });
  const {
    data: user,
    isSuccess: isLoggedIn,
    refetch,
    isFetching,
  } = useAuthMe();

  useEffect(() => {
    refetch();
  }, [router.pathname]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isFetching ? (
        <div className=" fixed inset-1/2 ">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <main className="min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar />
          <div className="fixed bottom-0 h-16">
            {isLoggedIn && user && <UserDropDown />}
          </div>
          {children}
          {!isLoggedIn && <GuestBanner />}
        </main>
      )}
    </div>
  );
}

export default Layout;
