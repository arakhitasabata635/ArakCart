import jwt from "jsonwebtoken";

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(404).json({
        message: "user is not login",
        success: false,
        error: true,
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log(err);
      console.log("decoded", decoded);
      if (err) {
        console.log("decoded", err);
      }
      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};

export default authToken;
