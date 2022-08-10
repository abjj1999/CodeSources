import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
const morgon = require("morgan");

require("dotenv").config();

const app = express();

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
    origin: ["http://localhost:3000"],
  })
);

//auto load routes
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is running");
});
