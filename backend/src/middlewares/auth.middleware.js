import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"No token provided- Unauthorized user"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res
              .status(401)
              .json({ message: "Token provided is invalid- Unauthorized user" });
        }

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res
              .status(401)
              .json({
                message: "User not found- Unauthorized user",
              });
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware",error);
        return res.status(500).json({message:"Internal server error"});
    }
}