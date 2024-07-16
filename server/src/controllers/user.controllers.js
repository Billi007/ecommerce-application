import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//REGISTER
const registerUser = async (req,res) => {
 try {
    const {userName,email,image,dateOfBirth,gender,_id, password} = req.body;

    if(!(userName && email && gender && _id && dateOfBirth && password))
        return res.json({
       status : 401,
       error: "all fields are required. hello"
      })
 
     let existingUser = await User.findOne({email})
     if(existingUser){
        return res.json({
            status : 400,
            error: "email already exists."
        })
     }

    //hashing password
    const hashedPassword = async (password) => {
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
        message: `Welcome ${user.userName}`,
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
const getallUser = async (req,res,next) => {
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
const getUser = async(req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
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

//DElETE USER
const deleteUser = async(req,res) => {
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
            message: "user deleted successfully."
        });
    } catch (error) {
        return res.json({
            status : 500,
            error: "something went wrong while deleting user.",
        })
    }
};



export {registerUser, getallUser, getUser, deleteUser};