import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux";
import Cookies from "js-cookie";
import { authMe } from "../redux/auth/actions";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  if (Cookies?.get && Cookies.get("token")) {
    store.dispatch(authMe());
  }
  console.log(`token`, Cookies.get("token"));
  console.log(`Cookies`, Cookies.withConverter);
  return (
    <div>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
