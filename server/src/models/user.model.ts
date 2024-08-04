import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
    _id: string;
    userName: string;
    email: string;
    image: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    //   Virtual Attribute
    age: number;
  }

const UserSchema = new Schema(
{
_id:{
    type: String,
    required: [true, "Please enter ID."],
},
image : {
    type: String,
    required: [true, "Please Upload image."],
},
role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
},
userName : {
    type: String,
    required: [true, "Please enter your Username."],
    unique: true,
},
password: {
type: String,
required: [true, "Please enter your Password."],
RegExp: '"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"'
},
email: {
    type: String,
    required: [true, "Please enter your Email."],
    unique:[ true, "Email already exists"],
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
},
gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, "Please select your gender."],
},
dob: {
    type: Date,
    required: [true, "Please enter your date of birth."],
}
},
{timestamps: true});

UserSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
  
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ){age--;}
  
    return age;
  });

export const User = mongoose.model('user', UserSchema);