import {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrders,
  updateOrder,
} from "@controllers/orderController";
import {
  authenticateUser,
  authorizePermissions,
} from "@middleware/authentication";
import express from "express";

let router;
const orderRouter = (router = express.Router());

router
  .route("/")
  .all(authenticateUser)
  .post(createOrder)
  .get(authorizePermissions("admin"), getAllOrders);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);

router
  .route("/:id")
  .all(authenticateUser)
  .get(getSingleOrders)
  .patch(updateOrder);

export default orderRouter;
