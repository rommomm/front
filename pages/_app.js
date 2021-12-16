import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "react-notifications/lib/notifications.css";
import { UserProvider } from "../components/UserContext";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { NotificationContainer } from "react-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <UserProvider>
        <Loader />
        <Component {...pageProps} />
        <NotificationContainer />
      </UserProvider>
    </div>
  );
}

export default MyApp;
