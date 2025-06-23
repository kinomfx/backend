import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const ConnectDB = async ()=>{
    try {   
        console.log(`${process.env.MONGODB_URL}/${DB_NAME}`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n DB connected , DBHOST: ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default ConnectDB