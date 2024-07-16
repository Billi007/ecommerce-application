import { User } from '../models/user.models.js';

//ONLY ADMIN CAN ACCESS

export const adminOnly = async(req,res,next) => {
    const id = req.params.id;
    try {
    if(!id){
        return res.status(400).json({
            error: "id ni h."
        });
    }
    
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                error: "User not found."
            });
        }
        if(user.role !== "admin"){
            return res.status(403).json({
                error: "Unauthorized Access."
            });
        }
       return next();
} catch (error) {
    return res.status(403).json({
        error: "Internal Server Error."
    });
}
}