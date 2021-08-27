import { Request, Response } from "express";
import { NotFoundError } from "@errors/index";

const notFound = (req: Request, res: Response, next: Function) => {
  next(new NotFoundError("No route found"));
};

export default notFound;
