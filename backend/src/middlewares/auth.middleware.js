import jwt from "jsonwebtoken"
import config from "../config/index.js"
import blacklistModel from "../models/blacklist.model.js";

const authMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const blacklistedToken  = await blacklistModel.findOne({token})

        if(blacklistedToken ){
            return res.status(401).json({
                message :"Token revoked"
            })
        }

        req.user = decoded;

        next()

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token Expired"
            })
        }

        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}


export default authMiddleware