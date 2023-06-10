import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

const JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lZXJhQGdtYWlsLmNvbSIsImlhdCI6MTY4MTgxMDYzNH0.Z_IuFqzP84asTrL4Mp1IHBNGT3oKZgzeHL7zAhMUb2Q";

export const getAlluser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"error"});
    }else{
        return res.status(200).json({users});
    }
}

export const addUsers=async(req,res,next)=>{
    const {name,email,password}=req.body;
    const olduser= await User.findOne({email});

    try{ 
        if(olduser){
           return res.status(404).json({message:"user already exists"});
        }
        let encryptedpassword=await bcrypt.hash(password,10);

        const user=new User({
            name,
            email,
            password:encryptedpassword,
            blogs:[]
        })
 
        // await User.insertMany({name,email,password:encryptedpassword,blogs:[]});
        user.save();
        return res.status(200).json({message:"user added!",user});
    }catch(err){
        return console.log(err);
    }
}

export const login=async(req,res,next)=>{
    const{email,password}=req.body;
   
   let olduser;
    try{
         olduser=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
        if(!olduser){
            return res.status(404).json({message:"user's not exist"});
        }
        const passwordvalidate=await bcrypt.compare(password,olduser.password);

        if(passwordvalidate){
            const token=sign({id:olduser._id},JWT_SECRET);
          if(res.status(201)){  
            return res.status(201).json({message:"logged in",user:token});
          }else{
            return res.json({message:"error"});
          }
        }
        return res.status(404).json({message:"invalid password"});
    }