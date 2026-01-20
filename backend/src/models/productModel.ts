import mongoose, { Model, Schema, Document } from "mongoose";

interface Product extends Document {
  productName: String;
  brandName: String;
  category: String;
  productImages: [];
  price: Number;
  sellingPrice: Number;
  description: String;
  userId: mongoose.Types.ObjectId;
}

const productSchema: Schema<Product> = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImages: [],
    price: Number,
    sellingPrice: Number,
    description: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel: Model<Product> = mongoose.model<Product>(
  "products",
  productSchema,
);

export default ProductModel;
