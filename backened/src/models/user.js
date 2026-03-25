import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        
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