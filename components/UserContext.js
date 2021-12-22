import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
import api from "../libs/api";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState();
  console.log(auth.data);

  function authMe() {
    api
      .get("/auth/me")
      .then((response) => {
        setAuth(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    // const user = authMe();
    authMe();
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);
  const setUser = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
  };

  const removeUser = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: isLoggedIn && user,

        setUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserProviderConsumer = UserContext.Consumer;

export default UserContext;
