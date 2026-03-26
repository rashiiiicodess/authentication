import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,  // This is the most important line
        trim: true,    // Removes whitespace from ends
        lowercase: true
        
    },
    password:{
        type:String,
        required:true,
    },
    isMfaActive:{
        type:Boolean,
        required:false,

    },
    twoFactorSecret:{
        type:String,
    },
},
    {
    timestamps:true,
    }


)
const User=mongoose.model("User",userSchema);
export default User;