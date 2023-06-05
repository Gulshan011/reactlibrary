import Message from "../models/Message.js";
import { io } from "../server.js";
export const messageController = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    io.emit(`message:${receiver}`, newMessage);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createMessage = (io) => async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    // Save the message to the database
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    // Emit the message to the receiver's socket
    io.to(receiver).emit("newMessage", newMessage);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};