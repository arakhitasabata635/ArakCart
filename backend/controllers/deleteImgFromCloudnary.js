import cloudinary from "../config/cloudinary.js";

const deleteCloudinaryImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    const result = await cloudinary.uploader.destroy(public_id);

    res.status(200).json({
      message: "image delete successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || err, error: true, success: false });
  }
};
export default deleteCloudinaryImage;
