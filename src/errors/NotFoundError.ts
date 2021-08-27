import CustomError from "./customError";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomError {
  constructor(message: string = "route not found") {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
