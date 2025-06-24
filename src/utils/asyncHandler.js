const asyncHandler = (requestHandles)=>{
    return (req , res , next)=>{
        Promise.resolve(requestHandles(req , res , next)).catch((error)=>{
            next(error)
        })
    }
}
export default asyncHandler