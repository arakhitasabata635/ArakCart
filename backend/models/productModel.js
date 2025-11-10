import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImages: [],
    price: Number,
    sellingPrice: Number,
    description: String,
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
