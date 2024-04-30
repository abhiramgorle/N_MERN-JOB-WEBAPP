import {catchAsyncError} from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import {User} from "../models/userSchema.js";


// export const isAuthorized = catchAsyncError(async(req, res, next)=>{
//     const {token} = req.cookies;
//     if(!token){
//         return next(new ErrorHandler("User not authorized", 400));
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 

//     req.user = await User.findById(decoded.id);

//     next();
// })

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorHandler("User not authorized", 400));
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, "abhiramgotsometihinfnew");
  req.user = await User.findById(decoded.id);
  next();
});