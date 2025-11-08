import express from "express";

import userSignUpController from "../controllers/userSignUp.js";
import userLoginController from "../controllers/userLogin.js";
import userDetailsController from "../controllers/userDetails.js";
import authToken from "../middlewares/authToken.js";
import userLogoutController from "../controllers/userLogout.js";
import allUsersController from "../controllers/allUsers.js";
import updateUserController from "../controllers/updateUser.js";
import  deleteCloudinaryImage from "../controllers/deleteImgFromCloudnary.js";

const router = express.Router();

router.post("/signup",userSignUpController)
router.post("/login",userLoginController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogoutController)


//admin pannel
router.get("/admin/users", authToken,allUsersController)
router.post("/admin/update-user", authToken,updateUserController)

//delete img from cloudnary
router.delete("/delete-image",deleteCloudinaryImage)





export default router ;


