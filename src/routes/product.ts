import express, { Router, Express } from "express";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
  getProductById,
} from "../controllers/product";
const productRoutes = Router();
const app: Express = express();

app.use(productRoutes);
productRoutes.post("/create", createProduct);
productRoutes.put("/update/:id", updateProduct);
productRoutes.delete("/delete/:id", deleteProduct);
productRoutes.get("/list", listProducts);
productRoutes.get("/get/:id", getProductById);
export default productRoutes;
