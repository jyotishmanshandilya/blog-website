import User from "../models/User";
import bcrypt from 'bcryptjs'
import bodyParser from "body-parser";

export const getAllUsers = async(req, res, next)=>{
    //res.send("inside the controller");
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        // res.status(404).json({message: err.message});
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "no users found"});
    }
    return res.status(200).json({users});
};

export const signup = async (req, res, next) =>{
    const {name, email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email}); 
    } catch (error) {
        console.log(err);
    }
    if(existingUser){
        res.status(400).json({message: "User already exists"});
    }
    const hashPwd = bcrypt.hashSync(password); 
    const newUser = new User({
        name,
        email,
        password: hashPwd,
        blogs:[]
    });
    

    try {
       await newUser.save();
    } catch (error) {
        console.log(error);        
    }return res.status(201).json({newUser});
};

export const login = async (req, res, next)=>{
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }
    if(!existingUser){
        return res.status(404).json({message: "User not registerd"});
    }
    const isCorrectPwd = bcrypt.compareSync(password, existingUser.password);
    if(!isCorrectPwd){
        return res.status(404).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message: "Login Succesfull !!"});
}








