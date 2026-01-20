import orderModel from "../../models/orderProductModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const sessonOrder = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { sessionId } = req.params;
    const sessionOrder = await orderModel.findOne({
      userId: req.userId,
      sessionId,
    });

    return res.status(200).json({
      message: "sesson order",
      data: sessionOrder,
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

export default sessonOrder;
