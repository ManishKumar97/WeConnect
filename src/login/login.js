import React from "react";
import SignIn from "./signin";
import SignUp from "./signup";
import UserService from "../services/userService";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  useEffect(() => {
    async function validateUser() {
      const user = await UserService.getUser();
      if (user) {
        history.push("/");
      }
    }
    validateUser();
  });
  return (
    <div className="container-fluid">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Login;
