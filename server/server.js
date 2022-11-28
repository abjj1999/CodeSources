import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
// import io from "socket.io";

const morgon = require("morgan");

require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});
//db cont
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // UseFindAndModify: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((errr) => {
    console.log("DB connection error ==> ", errr);
  });

//middlewares

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

//auto load routes
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

// socket.io
io.on("connect", (socket) => {
  // console.log("Socket connected", socket.id);
  socket.on("new-post", (newPost) => {
    // console.log("new post => ", newPost);
    socket.broadcast.emit("new-post-home", newPost);
  });
});

// socket.io
// io.on("connect", (socket) => {
//   // console.log("Socket connected", socket.id);
//   socket.on("hello-from-home-page", (data) => {
//     // console.log("new message from home page", data);
//     socket.broadcast.emit("hello", "world");
//   });
// });

const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
  console.log("server is running");
});
