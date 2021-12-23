import React, { useContext, useState } from "react";
import Link from "next/link";
import router from "next/router";
import api from "../../libs/api";

function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function signUp() {
    api
      .post("/register", {
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then(() => {
        router.push("/login");
      })

      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
          <div className="bg-white  px-6 py-8 rounded border text-black w-full">
            <h1 className="mb-5 text-2xl text-center">Sign up</h1>

            <span>First name</span>
            <input
              value={firstName}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>Last name</span>
            <input
              value={lastName}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>User name</span>
            <input
              value={userName}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="text"
              onChange={(e) => setUserName(e.target.value)}
            />
            <span>Email</span>
            <input
              value={email}
              type="text"
              className="block border border-black w-full p-3 rounded mb-4"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Password</span>
            <input
              value={password}
              type="password"
              className="block border border-black w-full p-3 rounded mb-4"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password confirmation</span>
            <input
              value={passwordConfirmation}
              type="password"
              className="block border border-black w-full p-3 rounded mb-4"
              name="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button
              onClick={signUp}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
            >
              Sign Up
            </button>
          </div>
          <div className="text-grey-dark mt-6 items-center ">
            <Link href="/login">
              <a className="no-underline border-blue text-blue hover:underline">
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
