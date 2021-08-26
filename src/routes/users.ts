import express from "express";
let router;
const userRouter = (router = express.Router());

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    users: ["list of users"],
  });
});

export default userRouter;
