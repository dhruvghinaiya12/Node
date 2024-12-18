const bcrypt=require("bcrypt")
const passport = require("passport")
const User = require("../model/userModel")

const LocalStrategy=require("passport-local").Strategy

const Authentication=(passport)=>{
    passport.use(new LocalStrategy({usernameField:"email"},async(email,password,done)=>{

        try {
            let user=await User.findOne({email:email})
            if(!user){
                return done(null,false)
            }
            let passwordMatch=await bcrypt.compare(password,user.password);

            if(!passwordMatch){
                return done(null,false)
            }
            return done(null,user)
            
        } catch (error) {
            return done(error, false);
        }
    }))
    passport.serializeUser((user,done)=>{
        return done(null,user.id);
    })

   passport.deserializeUser(async(id,done)=>{
    let user=await User.findById(id);
    return done(null,user)
   })
}

module.exports=Authentication;
