import express, { Router, Express } from "express";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../controllers/user";

const userRoutes = Router();
const app: Express = express();

app.use(userRoutes);
userRoutes.post("/address", createAddress);
userRoutes.delete("/address/:id", deleteAddress);
userRoutes.put("/address/:id", updateAddress);

export default userRoutes;
