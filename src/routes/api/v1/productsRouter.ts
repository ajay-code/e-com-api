import express from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "@middleware/authentication";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "@controllers/productController";
import { getSingleProductReviews } from "@controllers/reviewController";

let router;
const productRouter = (router = express.Router());

router
  .route("/")
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions("admin")], createProduct);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  // authenticate all following request
  .all([authenticateUser, authorizePermissions("admin")])
  .patch(updateProduct)
  .delete(deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

export default productRouter;
