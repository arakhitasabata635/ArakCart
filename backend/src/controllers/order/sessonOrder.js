import orderModel from "../../models/orderProductModel.js";

const sessonOrder = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionOrder = await orderModel.findOne({
      userId: req.userId,
      sessionId,
    });

    res.status(200).json({
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
