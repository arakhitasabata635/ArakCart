import express from "express";
import userSignUpController from "../controllers/user/userSignUp.js";
import userLoginController from "../controllers/user/userLogin.js";
import userDetailsController from "../controllers/user/userDetails.js";
import userLogoutController from "../controllers/user/userLogout.js";
import allUsersController from "../controllers/user/allUsers.js";
import updateUserController from "../controllers/user/updateUser.js";
import deleteCloudinaryImage from "../controllers/deleteImgFromCloudnary.js";

import uploadProductControler from "../controllers/product/uploadProduct.js";
import allProductlistControler from "../controllers/product/allProduct.js";
import editProductControler from "../controllers/product/editProduct.js";

import authToken from "../middlewares/authToken.js";
import getCategoryProduct from "../controllers/product/getCategoryProduct.js";
import getCategoryWiseProduct from "../controllers/product/getCategoryWiseProduct.js";
import singleProductDetails from "../controllers/product/singleProductDetails.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogoutController);

//admin pannel
router.get("/admin/users", authToken, allUsersController);
router.post("/admin/update-user", authToken, updateUserController);

//delete img from cloudnary
router.delete("/delete-image", authToken, deleteCloudinaryImage);

//product
router.post("/upload-product", authToken, uploadProductControler);
router.get("/get-products", authToken, allProductlistControler);
router.post("/edit-product", authToken, editProductControler);
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-products",getCategoryWiseProduct)
router.post("/product-details",singleProductDetails)

export default router;
