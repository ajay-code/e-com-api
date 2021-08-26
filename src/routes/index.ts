import express from "express";
import userRouter from "./users";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    msg: "welcome to express app",
  });
});

router.use("/users", userRouter);

export default router;
