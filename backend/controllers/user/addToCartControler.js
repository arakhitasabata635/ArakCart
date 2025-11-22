const addToCartControler = async() => {
  try {
    const currentUser = req.userId;
    const productId = req.body;
    const 
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default addToCartControler;
