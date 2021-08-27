import { Request, Response } from "express";
import { NotFound } from "http-errors";

const notFound = (req: Request, res: Response, next: Function) => {
  next(new NotFound("No route found"));
};

export default notFound;
