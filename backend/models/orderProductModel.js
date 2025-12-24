import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true, // important for fast lookup
    },

    productDetails: {
      type: Array,
      default: [],
    },

    email: {
      type: String,
      default: "",
    },

    userId: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "CANCELLED"],
      default: "PENDING",
    },

    paymentDetails: {
      paymentId: {
        type: String,
        default: "",
      },
      payment_method_type: [],
      payment_status: {
        type: String,
        default: "",
      },
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
