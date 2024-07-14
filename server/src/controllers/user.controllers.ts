import { NextFunction,Request,Response } from "express";
import { User } from "../models/user.models";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NewUserRequestBody } from "../types/type.js";


//REGISTER
const registerUser = async (
    req:Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next:NextFunction
    ) => {
 try {
    const {userName,email,image,dateOfBirth,gender,_id, password} = req.body;

    if(!(userName && email && gender && _id && dateOfBirth && password))
        return res.json({
       status : 401,
       error: "all fields are required."
      })
 
     let existingUser = await User.findOne({email})
     if(existingUser){
        return res.json({
            status : 400,
            error: "email already exists."
        })
     }

    //hashing password
    const hashedPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}
const hashPassword = await hashedPassword(password);

const user = await User.create({
    userName,
    email,
    image,
    dateOfBirth,
    gender,
    _id,
    password : hashPassword
});

return res.status(200).json({
        message: "User created successfully",
        user,
    })
 } catch (error) {
    res.status(401).json({
        message: "Error creating user",
        error,
    })
 }
};

//GET ALL USERS
const getallUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find({}).select("-password");
        if(!user){
            return res.json({
                status : 401,
                error: "No user found."
            })
        }
        return res.json({
            status : 200,
            user
        })
    } catch (error) {
        res.json({
            status : 500,
            error: "Error fetching user."
        })
    }
};

//GET USER
const getUser = async(req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.json({
                status : 401,
                error: "Invalid ID."
            })
        }
        return res.json({
            status : 201,
            user
        });
    } catch (error) {
        return res.json({
            status : 500,
            error: "Error fetching user."
        })
    }
};

const deleteUser = async(req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.json({
                status : 401,
                error: "Invalid ID."
            })
        }
        await user.deleteOne()
;        return res.json({
            status : 201,
            user
        });
    } catch (error) {
        return res.json({
            status : 500,
            error: "user deleted successfully.",
        })
    }
};



export {registerUser, getallUser, getUser, deleteUser};