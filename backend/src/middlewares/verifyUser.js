import jwt from "jsonwebtoken"
import config from "../config/index.js"
import userModel from "../models/user.model.js";

export const verifyUser=async (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }

    const id = jwt.verify(token,config.JWT_SECRET)

    const user = await userModel.findById(id.id)

    req.user = user

    next()
}