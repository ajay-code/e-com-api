import express from "express";
import { StatusCodes } from "http-status-codes";
import userRouter from "./usersRouter";

let router;
const apiRouter = (router = express.Router());

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "json api v1" });
});

router.use("/users", userRouter);

export default apiRouter;
