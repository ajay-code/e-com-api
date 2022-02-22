import express from "express";
import { StatusCodes } from "http-status-codes";
import authRoutes from "./authRouter";
import userRouter from "./usersRouter";
import productRouter from "./productsRouter";
import reviewRouter from "./reviewRouter";
import orderRouter from "./orderRouter";

let router;
const apiRouter = (router = express.Router());

router.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.json({ msg: "json api v1" });
});

router.use("/auth", authRoutes);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewRouter);
router.use("/orders", orderRouter);

export default apiRouter;
