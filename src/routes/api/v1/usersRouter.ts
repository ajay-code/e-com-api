import { getAllUsers } from "@controllers/usersController";
import express from "express";

let router;
const userRouter = (router = express.Router());

/* GET users listing. */
router.route("/").get(getAllUsers);

export default userRouter;
