import { Request, Response } from "express";
import { prismaClient } from "..";
import { User } from "@prisma/client";
export const createAddress = async (req: Request, res: Response) => {
  try {
    // Instead of finding the user in the request we should find it in the Authtoken and then use it using any middleware
    let user: User;
    user = await prismaClient.user.findFirstOrThrow({
      where: {
        id: req.body.userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const address = await prismaClient.address.create({
      data: {
        ...req.body,
        userId: user.id,
      },
    });
    return res.status(201).json(address);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteAddress = async (req: Request, res: Response) => {};
export const updateAddress = async (req: Request, res: Response) => {};
export const getAddressById = async (req: Request, res: Response) => {};
