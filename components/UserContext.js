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

  async function users() {
    await api
      .get("/auth/me")
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (users()) {
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
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserProviderConsumer = UserContext.Consumer;

export default UserContext;
