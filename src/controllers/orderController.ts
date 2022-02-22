import { Request, Response } from "express";
import { checkPermissions } from "@utils/index";
import Product from "@models/Product";
import Order from "@models/Order";
import { BadRequestError, NotFoundError } from "@errors/index";

const stubStripeAPI = async ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const client_secret = "someSecretValue";
  return { client_secret, amount };
};

export const createOrder = async (req: Request, res: Response) => {
  const { items: cartItems, shippingFee, tax } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("no cart item provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("no tax and shipping fee provided");
  }

  let orderItems = [];
  let subTotal = 0;

  for (let item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`no product with id: ${item.product}`);
    }

    const { name, price, image, _id } = dbProduct;
    const singleCartItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    orderItems.push(singleCartItem);
    subTotal += item.amount * price;
  }

  const total = tax + shippingFee + subTotal;
  const paymentIntent = await stubStripeAPI({ amount: total, currency: "usd" });

  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user?._id,
  });

  return res.json({ order, clientSecret: order.clientSecret });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({});

  return res.json({ orders, count: orders.length });
};

export const getSingleOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError(`no order with id: ${id}`);
  }

  checkPermissions(req.user as User, order.user);

  return res.json({ order });
};

export const getCurrentUserOrders = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const orders = await Order.find({ user: userId });

  return res.json({ orders });
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new NotFoundError(
      `no order exist with payment intent id: ${paymentIntentId}`
    );
  }

  checkPermissions(req.user as User, order.user);

  order.status = "paid";
  order.paymentIntentId = paymentIntentId;
  await order.save();

  return res.json({ order });
};
