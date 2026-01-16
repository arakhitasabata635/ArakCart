import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
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
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    receiver: {
      receiverName: {
        type: String,
        default: "",
        trim: true,
      },
      phone: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      pincode: {
        type: String,
        default: "",
      },
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
