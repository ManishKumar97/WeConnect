const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const socket = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const port = 3001;

// express app
const app = express();
const server = http.createServer(app);

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
app.use("/", messageRoutes);

//start express server
server.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

//SocketIO
const users = new Map();
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("----Socket Connection successfull");
  socket.on("addUser", (userid) => {
    if (userid) users.set(userid, socket.id);
    console.log(users);
  });

  socket.on("disconnect", () => {
    let k = null;
    users.forEach((value, key) => {
      if (value == socket.id) {
        k = key;
      }
    });
    users.delete(k);
  });

  socket.on("sendMessage", ({ senderid, receiverid, text }) => {
    io.to(users.get(receiverid)).emit("getMessage", {
      senderid,
      text,
    });
  });
});
