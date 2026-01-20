import orderModel from "../../models/orderProductModel";
import { Request, Response } from "express";  

const allOrdersControler =async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allOrders = await orderModel
      .find({ userId: req.userId, status: "paid" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All Orders",
      data: allOrders,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default allOrdersControler;
