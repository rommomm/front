import Cookies from "js-cookie";
import React, { useState } from "react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const userFromCookie = Cookies.get("user");
  const parsedUser = userFromCookie ? JSON.parse(userFromCookie) : null;
  const [user, setUserData] = useState(parsedUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

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
