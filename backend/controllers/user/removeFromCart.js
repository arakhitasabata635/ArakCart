
const removeFromCart = async() => {
    try {
    const currentUser = req.userId;
    const { productId } = req.body;

    const result = await cartModel.updateOne(
      { userId : currentUser },
      { $pull: { items: { productId } } }
    );
    return res.json({
      data: result,
      message: "Product Removed from Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default removeFromCart