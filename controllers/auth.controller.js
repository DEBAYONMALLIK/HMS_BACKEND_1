const bcrypt=require("bcryptjs");
const user_model=require("../models/user.model");
const jwt=require("jsonwebtoken");
const auth=require("../configs/auth.config");

async function signup(req,res){
 const {name,email,role}=req.body;
 const password=bcrypt.hashSync(req.body.password,10);

 try{
    const new_User= await user_model.create({name,email,role,password});
   

   const view_user={
      
         email:new_User.email,
         role:new_User.role,
         createdAt:new_User. createdAt,
         updatedAt:new_User.updatedAt

   }
    console.log("new user registered",new_User);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.status(201).json({
      success: true,
      user: view_user
     });


 }catch(error){
 
    console.log("error in registering",error.message);
    res.status(500).json({message:error.message});
 }


}

async function signin(req,res){
    const body=req.body;
    
    const user_check= await user_model.findOne({email:body.email});

    if (!user_check) {
      console.log("email not found ")
  return res.status(404).send({ message: "User not found" });
}

    const actual_pass=user_check.password;
    const input_pass=body.password;
     const check_pass=bcrypt.compareSync(input_pass,actual_pass);
     
     if(check_pass){
        const validity_time='10h';
        const token=jwt.sign(
         {email:user_check.email,
         _id:user_check._id,
          role:user_check.role}
         ,auth.secrete,
         {expiresIn:validity_time}
      );

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
};


      res.cookie("token",token,cookieOptions);

        res.status(200).json({

            success: true,
            message:"sucessfully login",
            name:user_check.name,
            email:user_check.email,
            role:user_check.role,
            token:token,
            
            validity_time:validity_time,
            createdAt:user_check. createdAt,
            updatedAt:user_check.updatedAt,
          
        })
        console.log("login to server")
     }
        else {
      res.status(401).json({message:"invalid login credentials "});
      console.log("incorrect pass");

    }


}

  async function logout(req,res){
   // just clear the cookes
   
res.cookie("token", "", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  expires: new Date(0)   // clear immediately
});

   res.status(200).json({
      success:true,
      message:"User logged out successfully"
   })
   console.log("logged out")
  } 

module.exports={
   signup,
   signin,
   logout,
}