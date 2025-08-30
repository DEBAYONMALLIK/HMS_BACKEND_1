const prescriptionModel=require("../models/prescription.model");
const appointmentModel=require("../models/appointment.model");


async function createPrescription(req,res){
    try{

        const doctor=req.userId;
        const{patient,medications,dateissued,notes}=req.body;

        const if_appointment= await appointmentModel.findOne({
            patient,
            doctor,
            status:"confirmed"
        })
        if(!if_appointment){  return res.status(404).json({ message: "No valid appointment found between doctor and patient"})};


        const prescription= await prescriptionModel.create({doctor,patient,medications,dateissued,notes});
        res.status(201).json({prescription_added:prescription});


    }catch(error){
     res.status(500).json({message:error});
    }
}

async function viewAllPrescriptionsOfDoctor(req,res){// view prescriptions of doctor
    try{
        const doctor=req.userId;
        const all_prescription = await prescriptionModel.find({doctor:doctor});

        if(!all_prescription){return res.status(404).json({message:"No Prescription Issued by you"})};

        res.status(200).json({all_prescription});


    }catch(error){
        res.status(500).json({error:error});
    }
}



async function viewAllPrescriptionsOfPatient(req,res){ // view prescriptions of patient
    try{
            const patient=req.userId;
            const all_prescription=await prescriptionModel.find({patient:patient});
            if(!all_prescription){return res.status(404).json({message:"No Prescription is Issued to you"})}
            res.status(200).json({all_prescription});

    }catch(error){
         res.status(500).json({error:error});
    }
}



module.exports={
    createPrescription,
    viewAllPrescriptionsOfDoctor,
    viewAllPrescriptionsOfPatient,
    
}