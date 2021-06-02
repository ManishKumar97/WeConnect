const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const port = 3001;

// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://testuser:testuser123@cluster0.ftvdq.mongodb.net/WeConnect";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

//routes
app.use("/", authRoutes);

//start express server
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
