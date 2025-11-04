import express from "express";
import userSignUpController from "../controllers/userSignUp.js";
import userLoginController from "../controllers/userLogin.js";

const router = express.Router();

router.post("/signup",userSignUpController)
router.post("/login",userLoginController)

export default router ;


