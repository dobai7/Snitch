import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import sendEmail from "../services/mailService/nodemailer.js";
import mail from "../services/mailService/template.js"
import blacklistModel from "../models/blacklist.model.js"

//google OAuth Implementation
import googleClient from "../config/googleClient.js";

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

    const emailToken = jwt.sign(
        { id: newUser._id },
        config.EMAIL_SECRET,
        { expiresIn: "1d" }
    );

    const html = await mail.verificationTemplate(`http://localhost:3000/api/auth/verify?token=${emailToken}`)

    const a = await sendEmail({
        to: email,
        subject: "Mail Varification",
        html
    })
    // console.log(a)

    return res.status(201).json({
        message: "user created successfully",
        success: true,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone
        }
    })

}

const verifyController = async (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ message: "token missing", success: false });
    }

    try {
        const decoded = jwt.verify(token, config.EMAIL_SECRET);

        const result = await userModel.updateOne({ _id: decoded.id }, { isVerified: true });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "user not found", success: false });
        }

        return res.status(200).json({ message: "user verified successfully", success: true });
    } catch (err) {
        return res.status(400).json({ message: "invalid or expired token", success: false });
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
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
        }
    })

}

const logoutController = async (req, res) => {

    try {

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
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "logout failed", success: false });
    }

}

const getMe = async (req, res) => {
    try {
        const decoded = req.user;

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "data retrive successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "something went wrong", success: false });
    }
}

const forgotPasswordController = async (req, res) => {
    try {
        const email = req.body.email;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(200).json({
                message: "Password reset email sent successfully",
                success: true
            })
        }

        const token = jwt.sign({ id: user._id }, config.RESET_SECRET, {
            expiresIn: "15m"
        });

        const html = await forgotPasswordTemplate(`http://localhost:3000/api/auth/reset-password?token=${token}`)

        await sendEmail({
            to: user.email,
            subject: "Reset Your Password",
            html: html,
        });

        res.status(200).json({
            message: "Password reset email sent successfully",
            success: true,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "something went wrong", success: false });
    }
}

const resetPasswordController = async (req, res) => {
    const token = req.query.token;
    const { password } = req.body;

    if (!token) {
        return res.status(400).json({ message: "token missing", success: false });
    }

    try {
        const decoded = jwt.verify(token, config.RESET_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        const newPassword = await bcrypt.hash(password, 10);

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            message: "password reset successfully",
            success: true
        })


    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Invalid or expired token"
        })
    }

}

// API 1: send the user to Google's consent screen
export const googleAuthRedirect = (req, res) => {
    const authUrl = googleClient.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
        prompt: "consent",
    });

    res.redirect(authUrl);
};

// API 2: handle Google's response after the user approves
export const googleAuthCallback = async (req, res) => {
    try {
        const { code } = req.query;

        // 1. exchange the code for tokens
        const { tokens } = await googleClient.getToken(code);
        googleClient.setCredentials(tokens);

        // 2. verify the id_token and extract user data
        const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // 3. check if the user already exists in the database
        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name,
                email,
                googleId,
                authProvider: "google",
                isVerified: true,
                role: "buyer"
            })
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        // 4. issue your own single JWT
        const token = jwt.sign({ id: user._id , role:user.role}, config.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // 5. redirect back to the frontend
        res.redirect(`${process.env.CLIENT_URL}/oauth-success`);
    }
    catch (error) {
        console.error("Google OAuth error:", error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }

}


export default {
    registerController,
    verifyController,
    loginController,
    logoutController,
    getMe,
    forgotPasswordController,
    resetPasswordController,
    googleAuthRedirect, 
    googleAuthCallback
}