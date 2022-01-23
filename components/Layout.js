import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import GuestBanner from "../components/GuestBanner";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { useAuthMeQuery } from "../redux/auth/authApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Layout({ children, title }) {
  // const { isLoggedIn, isLoading, user } = useSelector(({ user }) => user);
  const router = useRouter();
  const {
    data: user,
    isLoading,
    isSuccess: isLoggedIn,
    refetch,
    isFetching,
    isUninitialized,
  } = useAuthMeQuery(null, {
    skip: !(Cookies && Cookies.get("token")),
  });
  console.log("isUninitialized", isUninitialized);
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
