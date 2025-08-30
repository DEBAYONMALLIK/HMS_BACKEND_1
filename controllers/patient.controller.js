const patient_model = require('../models/patient.model.js');
const user_model=require("../models/user.model.js");


async function createPatient(req, res) { // check for doct valid id

     const email=req.email;
    const userId=req.userId;
     const{dob,gender,contact,medical_history,assigned_doctor}=req.body;
 
    try {


  
     const user = await user_model.findOne({email});
              if (!user) {
        return res.status(404).send({ message: "User not found" });
        }

       const name=user.name;


        const new_patient = await patient_model.create({dob,gender,contact,medical_history,assigned_doctor,name,email,userId});
        console.log("a new patient is created");
        res.status(201).json({
            success:true,
            title:"new patient",
            new_patient});
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: error.message });
    }

}

async function getAllPatients(req, res) {
    try {
        const allPatient = await patient_model.find();
        console.log("All patients", allPatient);
        res.status(200).json({ 
            success:true,
            title: "all patients", 
            allPatient });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }
}

async function getPatientByEmail(req, res) {
    try {
          const email = req.query.email?.trim();

        const patient = await patient_model.findOne({email:email});

        if (!patient) { console.log("patient not found"); res.status(404).send("patient not found") }
        else res.status(200).json({
            success:true,
            patient,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updatePatient(req, res) {// check for doc valid id
    try {
        const email=req.params.email;

        const patient = await patient_model.findOneAndUpdate(
           {email:email}, req.body, { new: true, runValidators: true }
        );
        if (!patient) return res.status(404).json({ message: 'patient not found' });
        console.log(patient);
        res.status(200).json(patient);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

async function deletePatient(req, res) {
    try {
        const email=req.params.email;
        const patient = await patient_model.findOneAndDelete({email:email});
        if (!patient) return res.status(404).json({ message: 'patient not found' });
        res.status(200).json({ success:true,message: 'patient deleted' });

    } catch (error) {
        res.status(500).json({ success:false,error: error.message });
    }
}
module.exports = {
    createPatient,
    getAllPatients,
    getPatientByEmail,
    updatePatient,
    deletePatient
}