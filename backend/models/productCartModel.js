import mongoose from "mongoose";

const productCartSchema = new mongoose.Schema(
  {
    productId: {
      ref: "products",
      type: String,
    },
     quantity: {
        type: Number,
        default: 1,
      },
    userId: String,
  },
  {
    timestamps: true,
  }
);
productCartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const cartModel = mongoose.model("addToCart ", productCartSchema);

export default cartModel;
