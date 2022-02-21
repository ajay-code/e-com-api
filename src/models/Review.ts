import mongoose, { Document, Model } from "mongoose";

interface IReview {
  rating: number;
  title: string;
  comment: string;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

// add custom methods here
interface IReviewDocument extends IReview, Document {}

// add custom static methods here
interface IReviewModel extends Model<IReviewDocument> {}

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default mongoose.model<IReviewDocument, IReviewModel>(
  "Review",
  ReviewSchema
);
