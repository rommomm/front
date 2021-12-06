import React, { useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUp() {
    axios
      .post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.data.role_id);
        props.setToken(response.data.token);
        props.setRole(response.data.role_id);
      })
      .then(router.push("/"))
      .catch(function (error) {
        console.log(error);
      });
  }

  // const logIn = () => {
  //   Cookies.set("ticket_management_is_user_logged_in", true, {
  //     expires: 86400,
  //     sameSite: "lax",
  //   });

  //   router.push("/");
  // };

  // const signUp = (e) => {
  //   e.preventDefault();

  //   axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
  //     axios
  //       .post("http://localhost:8000/api/login", {
  //         email: email,
  //         password: password,
  //       })
  //       .then((response) => {
  //         if (response.data.error) {
  //           console.log(response.data.error);
  //         } else {
  //           logIn();
  //         }
  //       });
  //   });
  // };

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
              onClick={signUp}
              type="submit"
              className="w-full bg-blue-400 rounded-lg px-4 py-3 shadow-md"
            >
              Sign Up{" "}
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
