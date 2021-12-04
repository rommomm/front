import React from "react";
import Login from "../login";
import Register from "../register";
import Logout from "../logout";
function RouteComponent(props) {
  console.log(props);
  return (
    <div>
      <Logout  token={props.token}
                setToken={props.setToken}
                setRole={props.setRole}/>
      <Login  token={props.token}
                setToken={props.setToken}
                setRole={props.setRole}/>
      <Register  token={props.token}
                setToken={props.setToken}
                setRole={props.setRole}/>
    </div>
  );
}

export default RouteComponent;
