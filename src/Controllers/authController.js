import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import User from "../models/user.js"
import qrcode from "qrcode";
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User(
            {
                username,
                password:hashedPassword,
                isMfaActive:false,
            }
        );
        console.log("new user:",newUser);
        await newUser.save();
        res.status(200).json({message:"User registered successfully"});
    }
    catch(err)
    {
        res.status(500).json({error:"Error registering user",message:err.message})
    }
};
export const login=async(req,res)=>{
    console.log("The authenticated user is:",req.user);
    res.status(200).json({message:"User logged in successfuilly",
        username:req.user.username,
        isMfaActive:req.user.isMfaActive,
    })
};
export const logout = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized User" });
    }

    req.logout((err) => {
        if (err) {
            // Only return an error if Passport actually fails to log out
            return res.status(400).json({ message: "Logout failed", error: err.message });
        }

        // Now that Passport is cleared, kill the session data
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Error destroying session" });
            }

            // Finally, tell the browser to delete the cookie
            res.clearCookie("connect.sid"); 
            return res.status(200).json({ message: "Logout successfully" });
        });
    });
};
export const authStatus=async(req,res)=>{
    if(req.user)
    {
         res.status(200).json({message:"User logged in successfuilly",
        username:req.user.username,
        isMfaActive:req.user.isMfaActive,

        })
    }
    else{
        res.status(401).json({message:"Unauthorized User"})
    }
};
export const setup2FA=async(req,res)=>{
    try{
        console.log("The req.user is :",req.user);
        const user=req.user;
        var secret=speakeasy.generateSecret();
        console.log("The secret object is:",secret);
        user.twoFactorSecret=secret.base32;
        user.isMfaActive=true;
        await user.save();
        const url=speakeasy.otpauthURL({
            secret:secret.base32,
            label:`${req.user.username}`,
            issuer:"www.rashiagarwal.com",
            encoding:"base32",
        });
        const qrImageUrl=await qrcode.toDataURL(url);
        res.status(200).json({
            secret:secret.base32,
            qrCode:qrImageUrl
        })



    }
    catch(err)
    {
         res.status(401).json({error:"Error setting up 2FA"},{message:"Unauthorized User"});
    }

};
export const verify2FA=async(req,res)=>{
    const {token}=req.body;
    const user=req.user;

    const verified=speakeasy.totp.verify({
        secret:user.twoFactorSecret,
        encoding:"base32",
        token,
    })
    if(verified)
    {
        const jwtToken=jwt.sign({username:user.username},process.env.JWT_SECRET,
            {expiresIn:"1hr"}
        );
        res.status(200).json({message:"2FA successful",token:jwtToken})
    }
    else{
        res.status(400).json({message:"Invalid 2fa code"});
    }
};
export const reset2FA=async(req,res)=>{
    try{
        const user=req.user;
        user.twoFactorSecret="";
        user.isMfaActive=false
         await user.save();
         res.status(200).json({ message:"2FA reset successfull"})
    }
    catch(err)
    {
        res.status(500).json({error:"Error reseting 2fa",message:err})
    }
};
