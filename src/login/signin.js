import React from "react";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    const user = { email, password };
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response.body.name);
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
    </div>
  );
};

export default SignIn;
