import axios from "axios";
import React, { useEffect } from "react";
import router from "next/router";

function Logout(props) {
  useEffect(() => {
    logout();
  });

  function logout() {
    axios({
      method: "post",
      url: "http://localhost:8000/api/logout",
      headers: { Authorization: `Bearer ${props.token}` },
    })
      .then(function (response) {
        console.log(response);
        props.setToken();
        props.setRole();
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return <div></div>;
}

export default Logout;
