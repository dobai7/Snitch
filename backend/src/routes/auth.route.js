import express from "express"
import controller from "../controllers/auth.controller.js"
import { verifyUser } from "../middlewares/verifyUser.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

// register api :- /api/auth/register
authRouter.post("/register",controller.registerController)

authRouter.post("/verify",verifyUser,controller.verifyController)

authRouter.post("/login",controller.loginController)

authRouter.post("/logout", authMiddleware,controller.logoutController)

authRouter.get("/getMe",authMiddleware,controller.getMe)



export default authRouter