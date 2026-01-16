import mongoose from "mongoose";

const sellerRequestSchema = new mongoose.Schema(
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

    gstNumber: String,

    documents: {
      type: Array,
      required: true,
    },
    ownerNote: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const SellerModel = mongoose.model("seller", sellerRequestSchema);

export default SellerModel;
