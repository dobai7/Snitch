import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },  
  phone: { type: String , unique:true},
  role: { 
    type: String, 
    enum: ['buyer', 'seller'], 
    default: 'buyer' 
  },

  authProvider: { 
    type: String, 
    enum: ['local', 'google'], 
    default: 'local' 
  },
  googleId: { type: String },
  
  // Auth related
  isVerified: { type: Boolean, default: false },  
},{
  timestamps:true
})

const userModel = mongoose.model("users",userSchema)

export default userModel