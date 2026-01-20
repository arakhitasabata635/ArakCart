import express from "express";
import userSignUpController from "../controllers/user/userSignUp";
import userLoginController from "../controllers/user/userLogin";
import userDetailsController from "../controllers/user/userDetails";
import userLogoutController from "../controllers/user/userLogout";
import allUsersController from "../controllers/user/allUsers";
import deleteCloudinaryImage from "../controllers/deleteImgFromCloudnary";

import uploadProductControler from "../controllers/product/uploadProduct";
import allProductlistControler from "../controllers/product/allProduct";
import editProductControler from "../controllers/product/editProduct";

import authToken from "../middlewares/authToken";
import getCategoryProduct from "../controllers/product/getCategoryProduct";
import getCategoryWiseProduct from "../controllers/product/getCategoryWiseProduct";
import singleProductDetails from "../controllers/product/singleProductDetails";
import addToCartControler from "../controllers/cart/addToCartControler";
import getCartitemCount from "../controllers/cart/getCartitemCount";
import fetchAllCartProducts from "../controllers/cart/fetchAllCartProducts";
import removeFromCart from "../controllers/cart/removeFromCart";
import updateCartItemCount from "../controllers/cart/updateCartItemCount";
import searchProduct from "../controllers/product/searchProduct";
import categoryWiseProducts from "../controllers/product/categoryWiseProducts";
import createPayCheckoutSession from "../controllers/order/createPayCheckoutSession";
import allOrdersControler from "../controllers/order/allOrders";
import updateUserDetails from "../controllers/user/updateUserDetails";
import updateUserRole from "../controllers/user/updateUserRole";
import sessonOrder from "../controllers/order/sessonOrder";
import applyForSeller from "../controllers/forApplySeler/applyForSeller";
import sellerApplyStatus from "../controllers/forApplySeler/checkStatus";
import reapplySeller from "../controllers/forApplySeler/reapplySeller";
import allApplications from "../controllers/forApplySeler/allApplications";
import rejectSellerApplication from "../controllers/forApplySeler/rejectSellerApplication";
import applicationApprove from "../controllers/forApplySeler/applicationApprove";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogoutController);

//admin pannel
router.get("/admin/users", authToken, allUsersController);
router.post("/admin/update-user", authToken, updateUserDetails);
router.post("/user-role-update", authToken, updateUserRole);

//seller request
router.post("/apply-seller", authToken, applyForSeller);
router.get("/apply-status", authToken, sellerApplyStatus);
router.delete("/seller/reapply", authToken, reapplySeller);
router.get("/seller-requests", authToken, allApplications);
router.post("/reject-seller-application", authToken, rejectSellerApplication);
router.post("/approve-seller-application/:id", authToken, applicationApprove);

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
