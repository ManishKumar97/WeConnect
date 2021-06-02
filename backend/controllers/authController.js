const User = require("../models/user");
const jwt = require("jsonwebtoken");

//handle errors
const handleUserError = (err) => {
  let errors = { name: "", email: "", password: "" };
  if (err.message === "Email not found. Please Signup") {
    errors.email = err.message;
  }
  if (err.message === "Incorrect password") errors.password = err.message;
  if (err.code == "11000") {
    errors.email = "This email is already registered";
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
//maxAge=1day
const maxAge = 24 * 60 * 60;

//create a JSON WEB TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, "weconnect secret", { expiresIn: maxAge });
};

const signup_post = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      console.log("user added");
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({ user: user._id });
    })
    .catch((err) => {
      const errors = handleUserError(err);
      res.status(400).send({ errors });
    });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleUserError(err);
    res.status(400).json({ errors });
  }
};
const checkLoginStatus = (req, res) => {
  res.status(200).json({});
};
module.exports = { signup_post, login_post, checkLoginStatus };
