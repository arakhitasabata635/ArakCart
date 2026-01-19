import mongoose, { Model, Schema, Document } from "mongoose";

interface Cart extends Document {
  userId?: mongoose.Types.ObjectId;
  items: [
    {
      productId?: mongoose.Types.ObjectId;
      quantity?: number;
    },
  ];
}

const productCartSchema: Schema<Cart> = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true },
);
productCartSchema.index({ userId: 1 });
const cartModel: Model<Cart> = mongoose.model<Cart>(
  "addToCart",
  productCartSchema,
);

export default cartModel;
