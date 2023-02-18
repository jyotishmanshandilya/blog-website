import Blogs from "../models/Blog";
import User from "../models/User";
import bodyParser from "body-parser";
import mongoose from "mongoose";

export const getAllBlogs = async(req, res, next)=>{
    let blogs;
    try {
        blogs = await Blogs.find();
    } 
    catch (error) {
        console.log(error);
    }
    if(!blogs){
        return res.status(404).json({message: "No blogs uploaded yet"});
    }
    return res.status(200).json({blogs});
}

export const addBlog = async(req, res, next)=>{
    const {title, description, image, user} = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        console.log(error);
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to find a user by this id"});
    }
    const blog = new Blogs({
        title, 
        description, 
        image, 
        user,
    });
    try {
        const session =await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
    return res.status(200).json({blog});
};

export const updateBlog = async(req, res, next)=>{
    const {title, description} = req.body;
    const blogId = req.params.id;
    let existingBlog;
    try {
        existingBlog = await Blogs.findByIdAndUpdate(blogId, {
            title,
            description
        });
    } catch (error) {
        console.log(error);
    }
    if(!existingBlog){
        return res.status(505).json({message: "Unable to update blog"});
    }
    return res.status(200).json({existingBlog});
}

export const getById = async(req, res, next)=>{
    const blogId = req.params.id;
    let reqBlog;
    try {
        reqBlog = await Blogs.findById(blogId);
    } catch (error) {
        console.log(error);
    }
    if(!reqBlog){
        return res.status(404).json({message: "Blog does not exist"});
    }
    return res.status(200).json({reqBlog});
};

export const deleteBlog = async(req, res, next)=>{
    const blogId = req.params.id;
    let deletedBlog;
    try {
        deletedBlog = await Blogs.findByIdAndRemove(blogId).populate("user");
        await deletedBlog.user.blogs.pull(deletedBlog);
        await deletedBlog.user.save();
    } catch (error) {
        console.log(error);
    }
    if(!deletedBlog){
        return res.status(500).json({message: "Unable to delete blog"});
    }
    return res.status(200).json({message:"Blog successfully deleted"});
};

export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        console.log(error);
    }
    if(!userBlogs){
        return res.status(404).json({message: "No blogs found for this user"});
    }
    return res.status(200).json({blogs:userBlogs});
}
