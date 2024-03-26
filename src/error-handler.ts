import { Request, Response, NextFunction } from "express";

export const errorHandler = (method: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      method(req, res, next);
    } catch (error) {
      console.log(error);
      //   if(error instanceof HttpError){
      //     res.status(error.statusCode).json({
      //       success: false,
      //       message: error.message,
      //     });
    }
  };
};
