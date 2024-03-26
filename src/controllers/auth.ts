import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { prismaClient } from "..";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    // Here we can also use the schema beign used in schema/auth.ts with zod
    // For example we can use the following code to validate the request body
    // let user=await LoginSchema.parse(req.body)
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
    next(error);
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);

  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  return res.json(req.user);
  
};
