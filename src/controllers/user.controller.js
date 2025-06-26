import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {UploadOnCloudinary} from '../utils/cloudinary.js'
import { create } from 'domain'
import ApiResponse from '../utils/ApiResponse.js'
const registerUser = asyncHandler(async (req , res , next)=>{
    // step -1 : to get the credentials of that person 
    const {fullName , email , username , password} = req.body
    console.log(`${email} , ${fullName}`)
    //step -2 : to validate the credentials -not empty
    const arr = [fullName  , email , username , password];
    let flag = false;
    arr.map((ele)=>{
        flag|= (ele.trim()==="");
    })
    if(flag){
        throw new ApiError(400 , "some field is left empty")
    }
    //step-3 : check if the user already exists - username , email
    const  existedUser = User.findOne({
        $or:[{username} ,{email}]
    })
    if(existedUser){
        throw new ApiError(400 , "user already exists with the given username or email")
    }

    // step-4 : check if images are there , check for avatar


    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400 , "no avatar found ")
    }

    //step-5 : upload images to cloudinary 
    const avatar = await UploadOnCloudinary(avatarLocalPath)
    const coverImage = await UploadOnCloudinary(coverLocalPath)
    if(!avatar){
        throw new ApiError(400 , "no avatar found ")
    }
    //step-6 : make user object - create entry in db


    const user = await User.create({
        fullName ,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email , 
        password,
        username:username.toLowerCase( )
    })
   
    // step-7 : remove password and refresh token field from response 
     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    //step - 8 : check if user is created
    if(!createdUser){
        throw new ApiError(500, "something went wrong while trying to make user")
    }
    // step-9: return response
    res.status(201).json(
        new ApiResponse(200 , createdUser, "user registered succesfully")
    )
})

export default registerUser