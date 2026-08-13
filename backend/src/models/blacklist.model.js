import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token: { type: String, required: true, unique:true },
    expiresAt : { type: Date, required: true ,expires: 0}
},{
    timestamps:true
})

const blacklistModel = mongoose.model("Blacklist", blacklistSchema);

export default blacklistModel;