import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

//configure env
dotenv.config();
//database config
connectDB();
//rest object
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//Routes
app.use("/api/v1/auth", authRoute);

//rest api
app.get("/", (req, res) => {
  res.send({ message: "Welcome " });
});
//port
const PORT = process.env.PORT || 8081;
// run listen
app.listen(PORT, () => {
  console.log(` ${process.env.DEV_MODE} , Server Started ${PORT}`);
});