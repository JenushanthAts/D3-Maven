import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import authRouter from "./routes/authRoutes.js";
import customerRouter from "./routes/customerRoute.js";
import verifyToken from "./middleware/VerifyToken.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/customer", verifyToken, customerRouter);
app.listen(port, () => {
  console.log(`Server is connected at ${port}`);
});
