const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Please enter password of atleast 6 characters "],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("Incorrect password");
  }
  throw Error("Email not found. Please Signup");
};
userSchema.statics.getUserById = async function (id) {
  const user = await this.findOne({ _id: id });
  return user;
};
userSchema.statics.getUserByEmail = async function (email) {
  const user = await this.findOne({ email: email });
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
