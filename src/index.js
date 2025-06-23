
import ConnectDB from "./db/index.js"   
import dotenv from 'dotenv';
dotenv.config();

ConnectDB()







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