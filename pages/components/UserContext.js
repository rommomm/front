import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = Cookies.get("user");
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
        isLoggedIn,

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
