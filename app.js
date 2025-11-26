import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManages.js";
import userRouter from "./router/user.router.js";
const PORT = 8000;
const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.set("port", process.env.PORT || 8000);
app.use("/api/v1/users", userRouter);
app.use("/api/v2/users", userRouter);
const start = async () => {
  try {
    await mongo
    ose.connect(
      "mongodb+srv://princejain1258:sakshijain478@cluster0.vm6l3hm.mongodb.net/"
    );

    console.log("MongoDB Connected Successfully");

    server.listen(app.get("port"), () => {
      console.log("Server Listening on PORT", app.get("port"));
    });

  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
  }
};


start();