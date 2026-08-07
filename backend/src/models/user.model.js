import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  phone: { type: String , unique:true},
  avatar: { type: String }, 
  // Role
  role: { 
    type: String, 
    enum: ['buyer', 'seller'], 
    default: 'buyer' 
  },
  
  // Auth related
  isVerified: { type: Boolean, default: false },  
},{
  timestamps:true
})

const userModel = mongoose.model("users",userSchema)

export default userModel