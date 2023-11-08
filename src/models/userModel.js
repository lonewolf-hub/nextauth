import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide a userName"],
        unique:true,
    },
    email:{
        type:String,
        required:[true, "Please provide a Email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Please provide a password"],
    },
    isVerfied:{
        type:Boolean,
        default: false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;