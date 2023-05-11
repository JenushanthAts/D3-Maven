import { Router } from "express";
import { login, registerUser } from "../controllers/authController.js";
import verifyToken from "../middleware/VerifyToken.js";

const authRouter = Router();
authRouter.post("/register", verifyToken, registerUser); //http://localhost:5001/api/auth/register;
authRouter.post("/login", login); //http://localhost:5001/api/auth/login;

export default authRouter;
