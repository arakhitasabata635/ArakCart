

const allProductlistControler = async(req,res)=>{
    try {

    res.status(200).json({
      message: "All products",
      data: allUsers,
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
}

export default allProductlistControler