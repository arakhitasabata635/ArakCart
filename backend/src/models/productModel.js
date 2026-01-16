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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
