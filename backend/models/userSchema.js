import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name!"],
        minLength: [3, "Name must contain atleast 3 characters!"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
          }


    },
    phone: {
        type: Number,
        required: [true, "Please provide your phone number"]
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [8, "password must contain atleast 8 characters!"],
        maxLength: [32, "password cannot exceed 32 characters"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please provide your role"],
        enum: ["Job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

// Hashing Password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// generating JWT
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, "abhiramgotsometihinfnew", {
        expiresIn: "1d"
    })
}


export const User = mongoose.model("User", userSchema);