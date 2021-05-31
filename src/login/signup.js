import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserAdded, setisUserAdded] = useState(false);

  //error messages
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const handleSubmit = (e) => {
    setemailError("");
    setpasswordError("");
    setisUserAdded(false);
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setemailError(data.errors.email);
          setpasswordError(data.errors.password);
        } else {
          setisUserAdded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row pt-3">
      <div className="col-sm-6"></div>
      <div className="col-sm-5">
        <div className="shadow mt-5 p-5 mb-4 bg-white">
          <h1 className="text-center">Create an Account</h1>
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <input
              type="text"
              className="form-control  mb-2 mr-sm-2"
              placeholder="Name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              className="form-control mb-2 mr-sm-2"
              placeholder="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {emailError && <p className="text-center text-danger">Error</p>} */}
            <p className="text-center text-danger">{emailError}</p>
            <br />
            <input
              type="password"
              className="form-control   mb-2 mr-sm-2"
              placeholder="New Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-center text-danger">{passwordError}</p>
            <br />
            <div className="col text-center">
              <input
                type="submit"
                className="btn btn-outline-light text-white mb-2"
                style={{ backgroundColor: "#DC3D24", width: "100px" }}
                name="signup"
                value="Register"
              />
            </div>
          </form>
          {isUserAdded && (
            <div className="text-center">
              {" "}
              Account is created successfully. Please Login
            </div>
          )}
        </div>
      </div>
      <div className="col-sm-1"></div>
    </div>
  );
};

export default SignUp;
