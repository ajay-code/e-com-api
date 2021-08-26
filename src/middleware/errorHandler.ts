import { Request, Response } from "express";
import { CustomError } from "@errors/customError";
const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: Function
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: err.message || "Something went wrong, please try again" });
};

export default errorHandler;
