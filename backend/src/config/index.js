import dotenv from "dotenv"
dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing");
}

if(!process.env.EMAIL_USER){
    throw new Error("EMAIL_USER missing");
}

if(!process.env.EMAIL_PASS){
    throw new Error("EMAIL_PASS missing");
}

if(!process.env.EMAIL_SECRET){
    throw new Error("EMAIL_SECRET missing");
}

if(!process.env.RESET_SECRET){
    throw new Error("EMAIL_PASS missing");
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID missing");
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET missing");
}

if(!process.env.GOOGLE_REDIRECT_URI){
    throw new Error("GOOGLE_REDIRECT_URI missing");
}

if(!process.env.CLIENT_URL){
    throw new Error("CLIENT_URL missing");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    RESET_SECRET: process.env.RESET_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    CLIENT_URL: process.env.CLIENT_URL,
    EMAIL_SECRET: process.env.EMAIL_SECRET
}

export default config