import React, { useState } from "react";
import Link from "next/link";

function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  // const signUp = async (
  //   first_name,
  //   last_name,
  //   user_name,
  //   email,
  //   password,
  //   password_confirmation
  // ) => {
  //   try {
  //     const response = await axios.post(`http://localhost:8000/api/register`, {
  //       first_name,
  //       last_name,
  //       user_name,
  //       email,
  //       password,
  //       password_confirmation,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="text"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User name"
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Password confirmation"
            />
            <button
              onClick={signUp}
              type="submit"
              class="w-full text-center py-3 rounded bg-green  bg-blue-500"
            >
              Sign Up{" "}
            </button>
          </div>

          <div class="text-grey-dark mt-6">
            <Link href="/sign-up/login">
              <a class="no-underline border-b border-blue text-blue">Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
