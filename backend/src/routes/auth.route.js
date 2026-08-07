import express from "express"
import controller from "../controllers/auth.controller.js"
import { verifyUser } from "../middlewares/verifyUser.js";

const authRouter = express.Router();

// register api :- /api/auth/register
authRouter.post("/register",controller.registerController)

authRouter.post("/verify",verifyUser,controller.verifyController)



export default authRouter