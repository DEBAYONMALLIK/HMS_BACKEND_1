const MedicalRecord=require("../models/medicalRecords.model");
const patient=require("../models/patient.model");
const appointment=require("../models/appointment.model");
const prescription=require("../models/prescription.model");

async function createMedicalRecord (req,res){
    
    try{
        const {patient}=req.params;

         const already_present = await MedicalRecord.findOne({ patient:patient }); // pat // path parameter 
        if(already_present){
          console.log("medical history already present");
           res.status(201).json({message:"medical history already present"});
            return;
        }
    //  const patient = req.email;
     const{allergies,pastSurgeries,chronicDiseases,bloodGroup,height,weight,medications,healthStats,healthMeter}=req.body;
     const newRecord= await MedicalRecord.create({patient,healthStats,allergies,pastSurgeries,chronicDiseases,bloodGroup,height,weight,medications,healthMeter});
      res.status(201).json({success:true,newMecicalReport:newRecord});

    }catch(error){
      console.log("error,",error)
         res.status(500).json({ message: "Server error", error: error });
    }
}

async function findMedicalRecord(req,res){
      try{
         const email = req.email;
              //"debayon9932@gmail.com"
              const record = await MedicalRecord.findOne({ patient:email }); // pat // path parameter
              console.log("MedicalRecord found:", record);
              if(!record) {console.log("record not found");res.status(404).json({message:"record not found"})}
              else res.status(200).json({
                  success:true,
                  record});
      }

      catch(error){
            res.status(500).json({ message: error.message });
      }


}


// find all medical records
async function findMedicalRecords(req, res) {
  try {
    // if you want ALL records (admin view):
    const records = await MedicalRecord.find();

    if (!records.length) {
      return res.status(404).json({ message: "No medical records found" });
    }

    res.status(200).json({
      success: true,
      count: records.length,
      records:records,
    });
  } catch (error) {
    console.error("Error fetching medical records:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports={
  findMedicalRecord,
  createMedicalRecord,
  findMedicalRecords
}