import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  return (
    <div>
      {pageLoading ? (
        <Loader />
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )}
    </div>
  );
}
