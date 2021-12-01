import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <h1>Register Page</h1>
      <input type="text" placeholder="name" />
      <br />
      <br />
      <input type="password" placeholder="password" />
      <br />
      <br />
      <input type="text" placeholder="email" />
      <br />
      <br />
      <button>Sign Up</button>
    </div>
  );
}

export default Register;
