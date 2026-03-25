import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local"
import bcrypt from "bcrypt";
import User from "../models/user.js";

passport.use(
    new LocalStrategy(async(username,password,done)=>{
        try{
            const user=await User.findOne({username});
            if(!user)
                return done(null,false,{message:"User not found"})
            const isMatch=await bcrypt.compare(password,user.password);
            if(isMatch)
                return done(null,user);
            else
                return done(null,false,{message:"Incorrect password"})
        }
        catch(err)
        {
            return done(err);
        }
    })
);
  


// Correct: (user, done) are parameters, not an object
passport.serializeUser((user, done) => {
    console.log("We are inside serialize user");
    // We store only the user ID in the session cookie
    done(null, user._id);
});

// Correct: (id, done) are parameters
passport.deserializeUser(async (id, done) => {
    try {
        console.log("We are inside deserialize user");
        // We use the ID to find the full user details from the DB
        const user = await User.findById(id);
        done(null, user); // This attaches the user object to req.user
    } catch (err) {
        done(err);
    }
});