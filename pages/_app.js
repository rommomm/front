import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { UserProvider } from "../components/UserContext";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <UserProvider>
        <Loader />
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}

export default MyApp;
