import { Request, Response } from 'express'
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt'
import { NewUserRequestBody } from '../types/types.js';


//REGISTER USER
const registerUser = async(req: Request<{},{}, NewUserRequestBody>,res: Response) => {
    const {userName,gender, dob,email,password, _id} = req.body;
    const image = req.file;

    try {
    if(!userName || !gender || !dob || !email || !password || !_id) {
        return res.json({ 
            status:401,
            message:'Please fill all the required fields'
         });
    }
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.json({
            status:409,
            message: 'Email already exists'
        });
    }
    //hashing password
    const hashedPassword = async (password: string) => {
        return await bcrypt.hash(password, 10);
    }
    const hashPassword = await hashedPassword(password);
    
    let user = await User.findById(_id);
    if(user) {
        return res.json({
            status: 200,
            message: `Welcome, ${user.userName}`
        });
    }
    user = await User.create({
        userName,
        gender,
        dob,
        email,
        password: hashPassword,
        image: image?.path,
        _id,
     });
     return res.json({
        status:201,
        message: 'User created successfully',
        user
     });
    } catch (error) {
        return res.json({
            status:500,
            error: "Error creating user"
         });
    }
}

// GET ALL USER
const getAllUser = async(req:Request, res:Response) => {
    try {
    const user = await User.find({}).select("-password");
    
    return res.json({
        status:200,
        user
     });
    } catch (error) {
        return res.json({
            status:500,
            error: "Error getting user"
        });
    }
};

// GET USER
const getUser = async(req:Request, res:Response) => {
const id = req.params.id;

try {
    const user = await User.findById(id).select("-password");
    if(!user) {
        return res.json({
            status:404,
            message: 'User not found'
        });
    }
    return res.json({
        status:200,
        user
    });
} catch (error) {
    return res.json({
        status:500,
        error: "Error getting user"
    })
 }
};

// DELETE USER
const deleteUser = async(req:Request, res:Response) => {
const id = req.params.id;
const user = await User.findById(id);

try {
    if(!user){
        return res.json({
            status:404,
            message: 'Invalid Id'
        });
    }
    await user.deleteOne();
    return res.json({
        status:200,
        message: 'User deleted successfully'
    }) 
} catch (error) {
return res.json({
    status:500,
    error: "Error deleting user"
});
}
}

export {registerUser, getAllUser, getUser, deleteUser}