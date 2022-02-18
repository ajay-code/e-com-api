import { ObjectId } from "mongoose";
import { UnauthorizedError } from "@errors/index";

const checkPermissions = (requestUser: User, resourceUserId: ObjectId) => {
  if (requestUser.role === "admin") return;

  if (requestUser._id === resourceUserId.toString()) return;

  throw new UnauthorizedError("forbidden");
};

export default checkPermissions;
