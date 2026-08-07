import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import sendEmail from "../services/mailService/nodemailer.js";
import mail from "../services/mailService/template.js"
import { log } from "console";

const registerController = async (req,res)=>{
    const {name, email, password,phone,role} = req.body

    const user = await userModel.findOne({
        $or:[
            {email},
            {phone}
        ]
    })

    if(user){
        return res.status(401).json({
            message:"user already exists",
            success:false
        })
    }

    const hash = await bcrypt.hash(password,10);

    const newUser = await userModel.create({
        name,
        email,
        password:hash,
        phone,
        role
    })

    const html = await mail.verificationTemplate("http://localhost:3000/api/auth/verify")

    const a = await sendEmail({
        to:email,
        subject:"Mail Varification",
        html
    })
    console.log(a)

    const token = jwt.sign({id:newUser._id},config.JWT_SECRET,{
        expiresIn:"1d"
    })

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:24*60*60*1000,
    })

    return res.status(201).json({
        message:"user created successfully",
        success:true,
        newUser,
        token
    })

}

const verifyController = async (req,res)=>{
    const user =  req.user
    await userModel.updateOne({_id:user._id},{isVerified:true})

    res.status(200).json({
        message:"user Verified successfully"
    })
}

export default {
    registerController,
    verifyController
}