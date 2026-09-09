import express from "express"
import controller from "../controllers/auth.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";
import { loginValidator, registerValidator , emailValidator , passwordValidator} from "../validators/authValidator.js";

const authRouter = express.Router();

// register api :- /api/auth/register
authRouter.post("/register",registerValidator,controller.registerController)

authRouter.get("/verify",controller.verifyController)

authRouter.post("/login",loginValidator,controller.loginController)

authRouter.post("/logout", authMiddleware,controller.logoutController)

authRouter.get("/getMe",authMiddleware,controller.getMe)

authRouter.post("/forgot-password",emailValidator,controller.forgotPasswordController)

authRouter.post("/reset-password",passwordValidator,controller.resetPasswordController)

authRouter.get("/google",controller.googleAuthRedirect)

authRouter.get("/google/callback", controller.googleAuthCallback)

export default authRouter