import { Router } from "express";
import { loginController, registerController } from "../controllers/auth";
const authRoutes = Router();

authRoutes.post("/login", loginController);
authRoutes.post("/register",registerController)

export default authRoutes;