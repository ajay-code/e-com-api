import { NotFoundError, BadRequestError } from "@errors/index";
import Product from "@models/Product";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";

export const createProduct = async (req: Request, res: Response) => {
  req.body.user = req.user?._id;
  const product = await Product.create(req.body);

  return res.json({ product });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({}).populate("reviews");
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
  if (!req.files) {
    throw new BadRequestError("no files uploaded");
  }

  const productImage = req.files.image as UploadedFile;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("please upload image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError("please upload image smaller than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../../public/uploads",
    productImage.name
  );

  await productImage.mv(imagePath);

  return res.json({ image: `uploads/${productImage.name}` });
};
