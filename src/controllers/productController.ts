import { NotFoundError } from "@errors/index";
import Product from "@models/Product";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  req.body.user = req.user?._id;
  const product = await Product.create(req.body);

  return res.json({ product });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  return res.json({ products, count: products.length });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new NotFoundError(`product with id: ${id} not found`);
  }

  return res.send({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`product with id: ${id} not found`);
  }

  return res.send({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError(`product with id: ${id} not found`);
  }

  await product.remove();

  return res.send({ msg: "Success! product removed" });
};

export const uploadImage = async (req: Request, res: Response) => {
  return res.send(`upload image of product`);
};
