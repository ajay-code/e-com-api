import CustomAPIError from "@errors/customAPIError";
import User from "@models/User";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { attachCookieToResponse } from "@utils/index";
import { UnauthenticatedError, BadRequestError } from "@errors/index";

const getSubUser = ({
  name,
  _id,
  email,
  role,
}: {
  name: string;
  _id: any;
  email: string;
  role: string;
}) => {
  return { name, _id, email, role };
};

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  // user validation
  const emailAlreadyExists = await User.findOne({ email: email });
  if (emailAlreadyExists) {
    throw new CustomAPIError("Email Already Exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  // creating user
  const user = await User.create({ email, name, password, role });

  const userToken = getSubUser(user);

  attachCookieToResponse({ payload: userToken, res });

  res.status(StatusCodes.CREATED).json({ user: getSubUser(user) });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnauthenticatedError("Please provide valid email and password");
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw new UnauthenticatedError("Please provide valid password and email");
  }

  const userToken = getSubUser(user);

  attachCookieToResponse({ payload: userToken, res });

  res.json({ user: getSubUser(user) });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", { expires: new Date(Date.now() + 5000) });
  res.send("logout user");
};
