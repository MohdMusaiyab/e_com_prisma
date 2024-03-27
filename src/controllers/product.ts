import { Request, Response } from "express";
import { prismaClient } from "..";
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.create({
      data: {
        ...req.body,
        tags: req.body.join(","),
      },
    }); // Create a product
    res
      .status(201)
      .json({ product, success: true, message: "Products Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    if (product?.tag) {
      product.tags = product.tags.join(",");
    }
    const updatedProduct = await prismaClient.product.update({
      where: {
        id: +req.params.id,
      },
      data: {
        ...product,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {};
export const listProducts = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count();
  const skip = req.query && req.query.skip ? +req.query.skip : 0;
  const products = await prismaClient.product.findMany({
    skip: skip,
    take: 5,
  });
  return res.status(200).json({ products, count });
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
