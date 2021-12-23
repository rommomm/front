import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import api from "../libs/api";

const UserContext = React.createContext();

async function authMe(url) {
  const token = Cookies.get("token");
  if (token) {
    return api.get(url);
  }
}
export const UserProvider = ({ children }) => {
  const [user, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  const { data } = useSWR("/auth/me", authMe);

  const setUser = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
  };

  const removeUser = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };

  if (data?.data && !user) {
    setUser(data.data);
  }
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
