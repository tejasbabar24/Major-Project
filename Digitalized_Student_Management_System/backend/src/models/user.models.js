import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    role:{
        type:String,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
    },
    clgName:{
        type:String,
        index:true
    },
    deptName:{
        type:String,
        index:true
    },

},{timestamps:true})

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methodsgenerateAccessToken=function (){
    jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        role:this.role
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methodsgenerateRefreshToken=function (){
    return jwt.sign({
        _id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:REFRESH_TOKEN_EXPIRY
    }    
)
}

export const User=mongoose.model("User",userSchema) 