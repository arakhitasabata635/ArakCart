import express from "express";
import userSignUpController from "../controllers/user/userSignUp.js";
import userLoginController from "../controllers/user/userLogin.js";
import userDetailsController from "../controllers/user/userDetails.js";
import userLogoutController from "../controllers/user/userLogout.js";
import allUsersController from "../controllers/user/allUsers.js";
import deleteCloudinaryImage from "../controllers/deleteImgFromCloudnary.js";

import uploadProductControler from "../controllers/product/uploadProduct.js";
import allProductlistControler from "../controllers/product/allProduct.js";
import editProductControler from "../controllers/product/editProduct.js";

import authToken from "../middlewares/authToken.js";
import getCategoryProduct from "../controllers/product/getCategoryProduct.js";
import getCategoryWiseProduct from "../controllers/product/getCategoryWiseProduct.js";
import singleProductDetails from "../controllers/product/singleProductDetails.js";
import addToCartControler from "../controllers/cart/addToCartControler.js";
import getCartitemCount from "../controllers/cart/getCartitemCount.js";
import fetchAllCartProducts from "../controllers/cart/fetchAllCartProducts.js";
import removeFromCart from "../controllers/cart/removeFromCart.js";
import updateCartItemCount from "../controllers/cart/updateCartItemCount.js";
import searchProduct from "../controllers/product/searchProduct.js";
import categoryWiseProducts from "../controllers/product/categoryWiseProducts.js";
import createPayCheckoutSession from "../controllers/order/createPayCheckoutSession.js";
import allOrdersControler from "../controllers/order/AllOrders.js";
import updateUserDetails from "../controllers/user/updateUserDetails.js";
import updateUserRole from "../controllers/user/updateUserRole.js";
import sessonOrder from "../controllers/order/sessonOrder.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogoutController);

//admin pannel
router.get("/admin/users", authToken, allUsersController);
router.post("/admin/update-user", authToken, updateUserDetails);
router.post("/user-role-update", updateUserRole);

//delete img from cloudnary
router.delete("/delete-image", authToken, deleteCloudinaryImage);

//product
router.post("/upload-product", authToken, uploadProductControler);
router.get("/get-products", authToken, allProductlistControler);
router.post("/edit-product", authToken, editProductControler);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-products", getCategoryWiseProduct);
router.post("/product-details", singleProductDetails);
router.get("/search", searchProduct);
router.get("/category-products", categoryWiseProducts);

//cart
router.post("/Add-cart", authToken, addToCartControler);
router.post("/remove-from-cart", authToken, removeFromCart);
router.get("/cart-itemCount", authToken, getCartitemCount);
router.get("/cart-products", authToken, fetchAllCartProducts);
router.post("/update-cart-item-count", authToken, updateCartItemCount);

//order
router.post(
  "/payment/create-checkout-session",
  authToken,
  createPayCheckoutSession
);
router.get("/orders", authToken, allOrdersControler);
router.post("/orders/session-order/:sessionId", authToken, sessonOrder);

export default router;
