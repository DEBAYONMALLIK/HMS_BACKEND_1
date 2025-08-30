const doctor_model=require("../models/doctor.model.js");
const user_model=require("../models/user.model.js")

const departmentTags = {
  generalMedicine: "fever cold cough body pain weakness headache fatigue viral infection general checkup stomach ache",

  cardiology: "heart pain chest discomfort palpitations shortness of breath high blood pressure cardiac arrest dizziness irregular heartbeat",

  dermatology: "skin rash acne pimples itching hair fall dandruff eczema allergy fungal infection skin spots pigmentation",

  pediatrics: "child fever vaccination cold cough in children growth problems nutrition issues ear pain in children stomach ache child infant care",

  gynecology: "pregnancy menstrual issues irregular periods infertility PCOS vaginal infection menopause delivery care women’s health",

  orthopedics: "joint pain knee pain back pain fracture sprain arthritis bone pain shoulder pain stiffness movement problem"
};



async function createDoctor(req,res){ // done

    
    const{specialization,phone,isActive,availability,review,experience} = req.body;

    //   const email= req.body.email || req.email;
    //   const userId=req.userId;
    
   try{
     let email;

    // if admin, they can add doctor using body.email
    if (req.role === "admin" && req.body.email) {
      email = req.body.email;
    } else {
      email = req.email; // doctor adding their own details
    }
        const user = await user_model.findOne({email});
            if (!user) {
      return res.status(404).send({ message: "User not found" });
      }
          const name = user.name;

        const tags=departmentTags[specialization];

        const newDoctor= await doctor_model.create({name,specialization,email,phone,isActive,availability,tags,review,experience});
        console.log(" a new doctor is created ");
        res.status(201).json({ 
              success:true ,
              title:"new doctor",
              newDoctor
            });

    }catch(error){
        console.log("new doctor can not be created",error.message);
        res.status(400).json({message:error.message})

    }

}


 async function getAllDoctor(req,res){ //done
    try{
        const allDoctor= await doctor_model.find();
        // console.log("All Doctors",allDoctor);
        res.status(200).json( {
            success:true ,
            title: "all Doctors ",
            allDoctor});

    }
    catch(error){
        console.log("internal server error..",error.messsage);
        res.status(500).json({message:error.message});
    }
 }


 async function getDoctorByEmail(req,res){
    try{
                const email = req.query.email?.trim();

           //"debayon9932@gmail.com"
            const doctor = await doctor_model.findOne({ email:email }); // pat // path parameter
            console.log("Doctor found:", doctor);
            if(!doctor) {console.log("doctor not found");res.status(404).send("doctor not found")}
            else res.status(200).json({
                success:true,
                doctor});
    }
    catch(error){
          res.status(500).json({ error: error.message });
    }
 }


 async function updateDoctor(req,res) {
    try{ 
            const email = req.params.email;
        const doctor = await doctor_model.findOneAndUpdate(
      { email: email },        // filter condition
      req.body,                // update data
      { new: true, runValidators: true } // options
    );
           if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
           console.log(doctor);
    res.status(200).json(doctor);
    }   
    catch(error){
          res.status(400).json({ error: error.message });
    }
 }


// DELETE Doctor Controller
async function deleteDoctor(req, res) {
  try {
    const { email } = req.params;

    // Check if doctor exists and delete
    const doctor = await doctor_model.findOneAndDelete({ email });

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    return res.status(200).json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Delete doctor error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}



 
module.exports={
    createDoctor,
    getAllDoctor,
    getDoctorByEmail,
    updateDoctor,
    deleteDoctor,
}