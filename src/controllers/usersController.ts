import { Request, Response } from "express";
import User from "@models/User";
import NotFoundError from "@errors/notFoundError";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "user" }).select("-password -__v");
  res.json({
    users,
  });
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params;
  let user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    return next(new NotFoundError(`user not found with id: ${id}`));
  }
  res.json({ user });
};

export const showCurrentUser = async (req: Request, res: Response) => {
  res.send("show current user");
};

export const updateUser = async (req: Request, res: Response) => {
  res.json(req.body);
};

export const updateUserPassword = async (req: Request, res: Response) => {
  res.json(req.body);
};
