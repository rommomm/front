import React, { useState } from "react";
import Link from "next/link";
import router from "next/router";
import Cookies from "js-cookie";
import api from "../../libs/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
            <span>Password</span>
            <input
              type="password"
              className="block border border-black w-full p-3 rounded mb-4"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />

            <button
              onClick={signIn}
              type="submit"
              className="w-full bg-blue-400 rounded-lg px-4 py-3 shadow-md"
            >
              Sign In
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            <Link href="/register">
              <a className="no-underline border-b border-blue text-blue">
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
