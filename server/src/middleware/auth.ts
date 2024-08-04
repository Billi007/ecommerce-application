import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";

const adminOnly = async(req:Request,res:Response,next: NextFunction)=> {
try {
const { id } = req.query;
if(!id){
    return res.status(400).json({
        status: 400,
        message: 'Invalid ID'
    });
}
const user = await User.findById(id);
if(!user){
    return res.status(404).json({
        status: 404,
        message: 'User not found'
    });
}
if(user.role !== 'admin'){
    return res.status(403).json({
        status: 403,
        message: 'Unauthorized access'
    });
}
next()
} catch (error) {
    return res.json({
        status: 500,
        error: 'Error checking admin permissions' 
    })
}
}


export default adminOnly;