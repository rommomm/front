import React, { useState } from "react";
import Link from "next/link";

function Login() {
  const [userName, setUserName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  return (
    <div>
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Sign up</h1>

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="text"
              value={userName || emailUser}
              onChange={(e) => (setUserName || setEmailUser)(e.target.value)}
              placeholder="User name(email)"
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              value={passwordUser}
              onChange={(e) => setPasswordUser(e.target.value)}
              placeholder="Password"
            />

            <button
              // onClick={signUp}
              type="submit"
              class="w-full text-center py-3 rounded bg-green  bg-blue-500"
            >
              Sign Up{" "}
            </button>
          </div>

          <div class="text-grey-dark mt-6">
            <Link href="/sign-up/register">
              <a class="no-underline border-b border-blue text-blue">Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
