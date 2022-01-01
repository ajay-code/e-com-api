import express from "express";
import { StatusCodes } from "http-status-codes";
import authRoutes from "./authRoutes";
import userRouter from "./usersRouter";

let router;
const apiRouter = (router = express.Router());

router.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.status(StatusCodes.OK).json({ msg: "json api v1" });
});

router.use("/users", userRouter);
router.use("/auth", authRoutes);

export default apiRouter;
