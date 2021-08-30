import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({
    users: ["all the users"],
  });
};
