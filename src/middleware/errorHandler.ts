import { Request, Response } from "express";
import { CustomError } from "@errors/index";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: Function
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message || "Something went wrong, please try again" });
};

export default errorHandler;
