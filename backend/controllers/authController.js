const User = require("../models/user");

//handle errors
const handleUserError = (err) => {
  let errors = { name: "", email: "", password: "" };

  // if(err.code)
  //console.log(err);
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

const signup_post = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      console.log("user added");
      res.status(201).json(user);
    })
    .catch((err) => {
      const errors = handleUserError(err);
      //console.log(errors);
      res.status(400).send({ errors });
    });
};

const login_post = (req, res) => {
  User.findOne({ email: req.body.email }).then((data, error) => {
    if (error) {
      console.log("error" + err);
    } else console.log("data" + data);
    res.send(data);
  });
};
module.exports = { signup_post, login_post };
