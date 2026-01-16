import orderModel from "../../models/orderProductModel.js";

const allOrdersControler = async (req, res) => {
  try {
    const allOrders = await orderModel
      .find({ userId: req.userId, status: "paid" })
      .sort({ createdAt: -1 });

    res.status(200).json({
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
