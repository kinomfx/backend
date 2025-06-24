import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET 
});

const UploadOnCloudinary = async (LocalFilePath)=>{
    try {
        if(!LocalFilePath) return null
        //upload on cloudinary
        const response = await cloudinary.uploader.upload(LocalFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded
        console.log("File is uploaded " , response.url);
        return response
    } catch (error) {
        fs.unlinkSync(LocalFilePath) //remove the malicious locally saved file more like deleting the file
        return null;
    }
}

export default UploadOnCloudinary