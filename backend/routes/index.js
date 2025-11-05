import express from "express";

import userSignUpController from "../controllers/userSignUp.js";
import userLoginController from "../controllers/userLogin.js";
import userDetailsController from "../controllers/userDetails.js";
import authToken from "../middlewares/authToken.js";
import userLogoutController from "../controllers/userLogout.js";

const router = express.Router();

router.post("/signup",userSignUpController)
router.post("/login",userLoginController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogoutController)



export default router ;


