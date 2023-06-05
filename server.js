// import express from "express";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoute from "./routes/authRoute.js";
// import cors from "cors";
// import { io } from "../server.js";
// //configure env
// dotenv.config();
// //database config
// connectDB();
// //rest object
// const app = express();
// //middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// //Routes
// app.use("/api/v1/auth", authRoute);

// //rest api
// app.get("/", (req, res) => {
//   res.send({ message: "Welcome " });
// });
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle incoming messages
//   socket.on("message", (message) => {
//     console.log("Received message:", message);
//     const recipient = userList.find((user) => user.email === message.recipient);

//     if (recipient) {
//       // Send the message to the recipient's socket
//       io.to(recipient.socketId).emit("message", message.content);
//     }
//   });
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");

//     // Remove the user from the userList
//     // You may need to adapt this code to fit your specific application logic
//     const userIndex = userList.findIndex((user) => user.socketId === socket.id);
//     if (userIndex !== -1) {
//       userList.splice(userIndex, 1);
//     }
//   });
// });
// //port
// const PORT = process.env.PORT || 8081;
// // run listen
// app.listen(PORT, () => {
//   console.log(` ${process.env.DEV_MODE} , Server Started ${PORT}`);
// });
import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

import messageRoutes from "./routes/messageRoutes.js";
dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const port = process.env.PORT || 8081;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your React app's URL
    methods: "GET,POST", // Allow only GET and POST methods
  })
);
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/msg", messageRoutes);
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Ary-store" });
});
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("join", (userId) => {
    socket.join(userId);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
server.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});