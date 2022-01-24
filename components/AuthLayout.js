import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import router from "next/router";
import Cookies from "js-cookie";
import { useAuthMeQuery } from "../redux/auth/authApi";
import useAuthMe from "../hooks/useAutMe";

function AuthLayout({ children }) {
  const { isSuccess: isLoggedIn, isLoading } = useAuthMe();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  if (isLoading || isLoggedIn) return null;
  return <div> {children} </div>;
}

export default AuthLayout;
