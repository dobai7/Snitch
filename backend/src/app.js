import express from "express"
import morgan from "morgan"
import dns from "dns"

import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import sendEmail from "./services/mailService/nodemailer.js";
import errorHandler from "./middlewares/errorHandler.js";

dns.setServers([
    "0.0.0.0", "1.1.1.1"
])

const app = express();


app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)

app.use(errorHandler)
export default app