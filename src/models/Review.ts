import mongoose, { Document, Model, Types } from "mongoose";

interface IReview {
  rating: number;
  title: string;
  comment: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
}

// add custom instance methods here
interface IReviewDocument extends IReview, Document {}

// add custom static methods here
interface IReviewModel extends Model<IReviewDocument> {
  calculateAverageRating: (product: Types.ObjectId) => void;
}

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

ReviewSchema.statics.calculateAverageRating = async function (
  productId: Types.ObjectId
) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await mongoose.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating ?? 0),
        numOfReviews: result[0]?.numOfReviews ?? 0,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

export default mongoose.model<IReviewDocument, IReviewModel>(
  "Review",
  ReviewSchema
);
