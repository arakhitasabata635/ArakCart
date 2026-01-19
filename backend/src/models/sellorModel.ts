import mongoose, { Schema, Document, Model } from "mongoose";

interface Seller extends Document {
  userId?: mongoose.Types.ObjectId;
  shopName?: string;
  ownerName?: string;
  phone?: string;
  gstNumber?: string;
  ShopMail?: string;
  address?: string;
  documents?: any[];
  ownerNote?: string;
  status?: "pending" | "approved" | "rejected";
}

const sellerRequestSchema: Schema<Seller> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    gstNumber: { type: String, required: true },
    ShopMail: { type: String, required: true },
    address: {
      type: String,
    },
    documents: {
      type: [String],
      required: true,
    },
    ownerNote: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const SellerModel: Model<Seller> = mongoose.model<Seller>(
  "seller",
  sellerRequestSchema,
);

export default SellerModel;
