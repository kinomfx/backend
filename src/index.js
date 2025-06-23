
import ConnectDB from "./db/index.js"   
import dotenv from 'dotenv';
dotenv.config();
import app from "./app.js";


ConnectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`app is listening on port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo DB connection Failed" , err);
})







/*
import express from "express"
const app = express();
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error:",error)
            throw error;
        })
        app.listen(process.env.PORT , ()=>{
            console.log(`app is listening on ${process.env.PORT}` )
        })
    }
    catch(error){
        console.log(error)
        throw err
    }
})()
*/