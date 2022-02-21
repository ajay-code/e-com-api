import { Request, Response } from "express";
import Review from "@models/Review";
import Product from "@models/Product";
import { NotFoundError, BadRequestError } from "@errors/index";
import { checkPermissions } from "@utils/index";

export const createReview = async (req: Request, res: Response) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new NotFoundError(`no product with id: ${productId} found`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user?._id,
  });

  if (alreadySubmitted) {
    throw new BadRequestError("review for product already submitted");
  }

  req.body.user = req.user?._id;
  const review = await Review.create(req.body);
  return res.json({ review });
};

export const getAllReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });
  // .populate({ path: "user", select: "name email" });

  return res.json({ reviews, count: reviews.length });
};

export const getSingleReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  return res.json({ review });
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, comment, rating } = req.body;

  const review = await Review.findOne({ _id: id });
  if (!review) {
    throw new NotFoundError(`review with id: ${id} not found`);
  }

  checkPermissions(req.user as User, review.user);

  review.title = title;
  review.comment = comment;
  review.rating = rating;

  await review.save();

  return res.json({ review });
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new NotFoundError(`review with id: ${id} not found`);
  }

  checkPermissions(req.user as User, review.user);

  await review.remove();

  return res.send("Success! review removed");
};

export const getSingleProductReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviews = await Review.find({ product: id });

  res.json({ reviews, count: reviews.length });
};
