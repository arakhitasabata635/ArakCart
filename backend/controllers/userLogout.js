

const userLogoutController = async (req, res) => {
  try {
   res.clearCookies("token")

    res.status(200).json({
      data: [],
      sucess: true,
      error: false,
      message: "Logged out successfully!"
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userLogoutController;
