import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import API from "../api";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const userFromCookie = Cookies.get("user");
  const parsedUser = userFromCookie ? JSON.parse(userFromCookie) : null;
  const [user, setUserData] = useState(parsedUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function authMe() {
    try {
      setLoading(true);
      if (Cookies?.get && Cookies.get("token")) {
        const response = await API.profile.get();
        setUser(response.data);
      }
      setLoading(false);
    } catch (error) {
      Cookies.remove("token");
      console.log(error);
    }
  }

  useEffect(() => {
    authMe();
  }, [router.route]);

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
        loading,

        setUser,
        removeUser,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserProviderConsumer = UserContext.Consumer;

export default UserContext;
