import mongoose from "mongoose";
import Blogs from "./Blog";
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "blog",
        required: true
    }]
},{
    timestamps: true
});

const User = mongoose.model("user", userSchema);
export default User;








