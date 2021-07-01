const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const socket = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const port = 3001;

// express app
const app = express();
const server = http.createServer(app);
const io = socket(server);

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
app.use("/", conversationRoutes);

//start express server
server.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

//SocketIO

io.on("connection", (socket) => {
  console.log("Socket Connection successfull");
});
