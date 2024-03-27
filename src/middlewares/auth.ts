import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    // Extracting the token form the header
    // if token is present  not present say unauthorised
    // if the token is present verify the token and extract payload
    // to get the user from payload
    // to attach user to the request object
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised",
      });
    }
    try {
      const payload = jwt.verify(token, JWT_SECRET!) as any;
      const user = await prismaClient.user.findFirst({
        where: {
          id: payload.userId,
        },
      });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorised",
        });
      }
      // Now sicne the user is verified we need to assing the user in the request oject

      // req.body.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
