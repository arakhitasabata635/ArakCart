import mongoose, { Model, Schema, Document } from "mongoose";

interface Order extends Document {
  sessionId: string;

  productDetails: string[];

  email: string;

  userId: string;

  status: "pending";
  paid;
  cancelled;
  receiver: {
    receiverName: string;
    phone: number;
    address: string;
    city: string;
    pincode: number;
  };

  paymentDetails: {
    paymentId: string;
    payment_method_type: [];
    payment_status: string;
  };

  totalAmount: number;
}

const orderSchema: Schema<Order> = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    productDetails: {
      type: [String],
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
  { timestamps: true },
);

const orderModel: Model<Order> = mongoose.model<Order>("order", orderSchema);

export default orderModel;
