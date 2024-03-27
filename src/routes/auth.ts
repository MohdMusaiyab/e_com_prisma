import express,{ Router, Application ,Express} from "express";
import { loginController, me, registerController } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";
const authRoutes = Router();
const app: Express = express();

app.use(authRoutes);
authRoutes.post("/login", loginController);
authRoutes.post("/register",registerController);
// The verification routes not working as request is changed need to work on it
authRoutes.get("/me",authMiddleware,me);


export default authRoutes;
