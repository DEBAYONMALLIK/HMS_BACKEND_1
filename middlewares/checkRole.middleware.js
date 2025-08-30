const User= require("../models/user.model");

function checkRole(requiredRole){
    return async (req,res,next)=>{
        try{
            const user= await User.findOne({email:req.email});
            if(!user){
                  return res.status(404).json({ message: "User not found" });
            }

            if(!requiredRole.includes(user.role)){
                return res.status(403).json({message:"access denied"});
            }
            next();


        }
        catch(error){
        console.error("Error in checkRole middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports={
    checkRole,
}