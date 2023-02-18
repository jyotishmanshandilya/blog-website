import express from "express";
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import blogRouter from "./routes/blogRouter";
import cors from 'cors';
const app = express();

const port = 5000;
app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter)
mongoose.connect("mongodb+srv://jyotishman:Johnny2003@cluster0.qbcvbkr.mongodb.net/PersonalBlogDB?retryWrites=true&w=majority")
.then(()=>app.listen(port))
.then(()=>console.log(`Connected to database and listening at port: ${port} `))
.catch((err)=>console.log(err))
