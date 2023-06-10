import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogrouter from './routes/blog-routes.js';

const app=express();

app.use(express.json())

mongoose.connect("mongodb+srv://vasanrajendran:vastechdb5030@cluster0.ww91v2r.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=>{
    console.log("mongo connected");
}).catch((err)=>{
    console.log("error:",err);
})

app.use('/user',router);
app.use('/blog',blogrouter);

app.listen(5000);