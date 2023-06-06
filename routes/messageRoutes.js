import express from "express";
import {
  // messageController,
  // getMessages,
  // createMessage,
  sendEmail,
} from "../controllers/messageController.js";
// import { io } from "../server.js";
const router = express.Router();
//send message
// router.post("/", messageController);
// Retrieve messages
// router.get("/messages", getMessages);
router.post("/sendEmail", sendEmail);
// Create a new message
// router.post("/new-msg", (req, res) => {
//   createMessage(io)(req, res);
// });
// // Create a new message
// router.post("/", createMessage(io));
export default router;
