import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux";
import Cookies from "js-cookie";
import { authMe } from "../redux/auth/actions";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  if (Cookies?.get && Cookies.get("token")) {
    store.dispatch(authMe());
  }

  return (
    <div>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
