import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function AuthLayout({ children }) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useSelector(({ user }) => user);
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  if (isLoading || isLoggedIn) return null;
  return <div> {children} </div>;
}

export default AuthLayout;
