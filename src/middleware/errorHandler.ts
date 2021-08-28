import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

type CustomErrorType = {
  [key: string]: any;
  statusCode: number;
  msg: string;
}
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: Function
) => {
  // console.log(err.statusCodes);
  let customError: CustomErrorType = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  }
  
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found for id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // return res.status(customError.statusCode).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
