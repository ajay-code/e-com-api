import { Request, Response } from "express";
import User from "@models/User";
import { NotFoundError, BadRequestError } from "@errors/index";

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
  res.json({ user: req.user });
};

export const updateUser = async (req: Request, res: Response) => {
  res.json(req.body);
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const _id = req.user?._id;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("please provide both passwords");
  }

  const user = await User.findById(_id);
  if (!user) {
    throw new BadRequestError("user not found");
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new BadRequestError("incorrect credential");
  }

  user.password = newPassword;

  await user.save();

  res.json({ msg: "success! password updated" });
};
