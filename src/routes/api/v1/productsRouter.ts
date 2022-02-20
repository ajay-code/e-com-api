import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "@controllers/productController";
import {
  authenticateUser,
  authorizePermissions,
} from "@middleware/authentication";
import express from "express";

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

export default productRouter;
