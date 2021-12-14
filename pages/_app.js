import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { UserProvider } from "../components/UserContext";
import React, { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}

export default MyApp;
