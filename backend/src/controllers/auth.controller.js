import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import sendEmail from "../services/mailService/nodemailer.js";
import mail from "../services/mailService/template.js"
import blacklistModel from "../models/blacklist.model.js"
import { response } from "express";

const registerController = async (req, res) => {
    const { name, email, password, phone, role } = req.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { phone }
        ]
    })

    if (user) {
        return res.status(401).json({
            message: "user already exists",
            success: false
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email,
        password: hash,
        phone,
        role
    })

    const html = await mail.verificationTemplate("http://localhost:3000/api/auth/verify")

    const a = await sendEmail({
        to: email,
        subject: "Mail Varification",
        html
    })
    // console.log(a)

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, config.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({
        message: "user created successfully",
        success: true,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone
        },
        token
    })

}

const verifyController = async (req, res) => {
    const user = req.user
    await userModel.updateOne({ _id: user._id }, { isVerified: true })

    res.status(200).json({
        message: "user Verified successfully"
    })
}

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "user not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({
            message: "invalid credentials"
        })
    }

    if (user.isVerified === false) {
        return res.status(401).json({
            message: "user not verified"
        })
    }

    const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
        message: "user logged in successfully",
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        },
        token
    })

}

const logoutController = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = jwt.decode(token);

    const blacklistedToken = await blacklistModel.create({ token, expiresAt: new Date(decoded.exp * 1000) });

    res.clearCookie("token");

    return res.status(200).json({
        message: "user logged out successfully",
        success: true,
    })


}

const getMe = async (req,res)=>{
    const decoded = req.user;

    const user = await userModel.findById(decoded.id);

    if(!user){
        return res.status(404).json({
            message :"user not found"
        })
    }

    res.status(200).json({
        message : "data retrive successfully",
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        }
    })
}

export default {
    registerController,
    verifyController,
    loginController,
    logoutController,
    getMe
}