import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import GuestBanner from "../components/GuestBanner";
import UserDropDown from "./UserDropDown";
import { useRouter } from "next/router";
import useAuthMe from "../hooks/useAutMe";
import Loader from "./Loader";

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
    isLoading,
  } = useAuthMe();
  console.log("user", user);
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
        <Loader />
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
