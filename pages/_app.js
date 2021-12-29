import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { UserProvider } from "../components/UserContext";
import React from "react";

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
