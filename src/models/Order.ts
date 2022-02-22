import mongoose, { Document, Model, Types } from "mongoose";

interface IOrderItem {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: Types.ObjectId;
}
interface IOrder {
  tax: number;
  shippingFee: number;
  subTotal: number;
  total: number;
  orderItems: IOrderItem[];
  status: string;
  user: Types.ObjectId;
  clientSecret: string;
  paymentIntentId?: string;
}

interface IOrderDocument extends IOrder, Document {}

interface IOrderModel extends Model<IOrderDocument> {}

const OrderItemSchema = new mongoose.Schema<IOrderItem>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [OrderItemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrderDocument, IOrderModel>(
  "Order",
  OrderSchema
);
