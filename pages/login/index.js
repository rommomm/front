import React, { useContext, useState } from "react";
import Link from "next/link";
import router from "next/router";
import Cookies from "js-cookie";
import api from "../../libs/api";
import UserContext from "../../components/UserContext";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  function signIn() {
    api
      .post("/login", {
        login: login,
        password: password,
      })
      .then((response) => {
        Cookies.set("token", response.data.token);
        router.push("/");
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded border border-black text-black w-full">
            <h1 className="mb-5 text-2xl text-center">Sign up</h1>
            <span>User name(email)</span>
            <input
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <span>Password</span>
            <input
              type="password"
              className="block border border-black w-full p-3 rounded mb-4"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={signIn}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
            >
              Sign In
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            <Link href="/register">
              <a className="no-underline  border-blue text-blue hover:underline">
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
