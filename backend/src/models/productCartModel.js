import mongoose from "mongoose";

const productCartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);
productCartSchema.index({ userId: 1 });
const cartModel = mongoose.model("addToCart", productCartSchema);

export default cartModel;
