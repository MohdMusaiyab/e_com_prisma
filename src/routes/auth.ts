import express,{ Router, Application } from "express";
import { loginController, me, registerController } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";
const authRoutes = Router();
const app: Application = express();

authRoutes.post("/login", loginController);
authRoutes.post("/register",registerController);
authRoutes.get("/me",authMiddleware,me);

app.use(authRoutes);

export default app;
