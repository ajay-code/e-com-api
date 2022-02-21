import express from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "@middleware/authentication";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "@controllers/reviewController";

let router;
const reviewRouter = (router = express.Router());

router.route("/").get(getAllReviews).post(authenticateUser, createReview);

router
  .route("/:id")
  .get(getSingleReview)
  // authenticate all following request
  .all(authenticateUser)
  .patch(updateReview)
  .delete(deleteReview);

export default reviewRouter;
