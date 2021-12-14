import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { UserProvider } from "../components/UserContext";

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
