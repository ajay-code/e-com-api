import express from "express";
import authRoutes from "./api/v1/authRouter";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    msg: "welcome to express app",
  });
});

export default router;
