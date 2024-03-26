import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { prismaClient } from "..";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET!);

    res.json({
      success: true,
      message: "User Logged In Successfully",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    let user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    user = await prismaClient.user.create({
      data: {
        email: email,
        password: hashSync(password, 10),
        name: name,
      },
    });
    res.json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
