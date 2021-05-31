import React from "react";
import SignIn from "./signin";
import SignUp from "./signup";

const Login = () => {
  return (
    <div className="container-fluid">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Login;
