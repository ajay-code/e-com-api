import mongoose, { Document, Model, Types } from "mongoose";

interface IProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  company: string;
  image: string;
  colors: string[];
  featured: boolean;
  freeShipping: boolean;
  inventory: number;
  averageRatings: number;
  user: Types.ObjectId;
}

interface IProductDocument extends IProduct, Document {}

interface IProductModel extends Model<IProductDocument> {}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide product name"],
      maxlength: [100, "name should not be more then 100 charters"],
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "please provide product description"],
      maxlength: [1000, "description can't be more than 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpg",
    },
    category: {
      type: String,
      required: [true, "please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "please provide company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRatings: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProductDocument, IProductModel>(
  "Product",
  ProductSchema
);
