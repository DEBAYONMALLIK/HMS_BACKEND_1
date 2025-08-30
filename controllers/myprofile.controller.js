const doctor_model=require("../models/doctor.model");
const patient_model=require("../models/patient.model");
const user_model=require("../models/user.model");

 async function getMyProfile(req,res){
    try{
        let data;
        const role=req.role;
        const userId=req.userId;

        if(role=="doctor"){
         data= await doctor_model.findOne({userId});
        }
            else if(role=="patient"){
                    data= await patient_model.findOne({userId});
            }
            else {
                 return res.status(403).send("Access denied");
            }

            if(!data){
                 return res.status(404).json({ message: "Profile not found" });
            }
              res.status(200).json({message:"myinfo",data});
      


    }catch(error){
     res.status(500).json({ error: error.message });
     console.log(error)
    }
 }


  async function updateMyProfile(req,res){

     try{
     const role=req.role;
     const userId=req.userId;

     let user;
     
     if(role=="doctor"){
          user = await doctor_model.findOneAndUpdate({userId:userId},req.body,{new:true,runValidators:true} );
     }
     else if(role=="patient"){
               user= await patient_model.findOneAndUpdate({userId:userId},req.body,{new:true,runValidators:true} );    
     }
     else {
         return  res.status(403).json("Access Denied");
     }


     if(!user){
          console.log("user not found");
          return res.status(404).json({message:"profile not found"});
     }

          

     res.status(200).json({ message: "Profile updated", user });

     }catch(error){
            console.error("Update error:", error.message);
            res.status(500).json({ error: error.message });
     }


  }

  async function deleteMyProfile(req, res) { // add delete from user-table functionality 
  try {
    const { role, userId } = req;

    let deletedProfile;

    if (role === "doctor") {
      deletedProfile = await doctor_model.findOneAndDelete({ userId });


    } else if (role === "patient") {
      deletedProfile = await patient_model.findOneAndDelete({ userId });
    } else {
      return res.status(403).send("Access denied");
    }

    if (!deletedProfile) {
      return res.status(404).send("Profile not found");
    }
     await user_model.findByIdAndDelete(userId);

    res.status(200).send({ message: "Profile deleted", deletedProfile });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


 module.exports = {
getMyProfile,
updateMyProfile,
deleteMyProfile
 }