import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    seterror("");
    const user = { email, password };
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          if (data.errors.email) seterror(data.errors.email);
          else seterror(data.errors.password);
        } else if (data.user) {
          console.log("user authenticated");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="row py-3 bg-dark">
      <div className="col-sm-6">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <h1 className="px-4 h1TextColor">WeConnect</h1>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="row">
          <form className="form-inline text-white">
            <div className="form-group">
              <label htmlFor="username" className="mr-sm-2">
                Email:
              </label>
              <input
                type="text"
                className="form-control mt-2 mb-2 mr-sm-2"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mr-sm-2">
                Password:
              </label>
              <input
                type="password"
                value={password}
                className="form-control mt-2 mb-2 mr-sm-2"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-outline-dark text-white mt-2 mb-2 bgcolor"
                name="login"
                value="Log In"
                onClick={(e) => handleSubmit(e)}
              />
            </div>
          </form>
        </div>
        <div className="row text-center ">
          <p className="text-center text-danger">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
