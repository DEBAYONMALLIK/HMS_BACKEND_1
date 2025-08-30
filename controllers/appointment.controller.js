const appointmentSchema = require("../models/appointment.model.js");
const doctor_model = require("../models/doctor.model.js");
const patient_model = require('../models/patient.model.js');

async function createAppointment(req, res) {


    try {

        const patient=req.email;

        const { doctor,status,date,time,reason } = req.body;
            const existingAppointment = await appointmentSchema.findOne({patient,doctor,date,time});
            if(existingAppointment){
                   console.log("same apppointment is already present");
                   res.status(409).json({
                        message:"Appointment already issued"
                   })

                   return;
            }



        const new_appointment = await appointmentSchema.create({patient,doctor,status,date,time,reason});
        // pass UserId as it is getting stored in req.userid and its only getting passed

        console.log("new appointmeant is created");
        res.status(201).json({
            success:true,
            new_appointment});
    } catch (error) {
        console.log("message:", error.message);
        res.status(500).json({ message: error.message });
    }


}

async function getAllAppointment(req, res) {  // role specefic view
  const { role, email } = req;
  // change userid to email

  try {
    let appointments;

    if (role === "patient") {
      appointments = await appointmentSchema.find({ patient: email });
    } else if (role === "doctor") {
      appointments = await appointmentSchema.find({ doctor: email });
    } else if (role === "admin") {
      appointments = await appointmentSchema.find();
    } else {
      return res.status(403).send("Access denied");
    }
        if(!appointments){console.log("no appointment found"); res.status(404).json({ message: `no appointment with the email ${req.email} is found` })}
     else res.status(200).json({
        success:true,
        appointments});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }


 

}

async function getAppointmentById(req, res) {
     // change userid to email
    try {
        const appointment = await appointmentSchema.findById(req.params.id);
        if (!appointment) { console.log("no appointment found"); res.status(404).json({ message: `no appointment with the id ${req.params.id} is found` }) }
        else res.status(200).json(appointment);


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log({ message: error.message });

    }

}
async function updateAppointment(req, res) {
     // change userid to email

    try {
        const { patient, doctor, date, time, status } = req.body; // for checking if the patient and doctor IDs are correct or not.

        if (patient) {
            const patient_id = await patient_model.findOne({email:patient});
            if (!patient_id) { console.log(`no patient  found`); res.status(404).json(`no patient with id=${patient} found`); return; }
        }

        if (doctor) {
            const doctor_id = await doctor_model.findOne({email:doctor});
            if (!doctor_id) { console.log(`no Doctor found`); res.status(404).json(`no Doctor with id=${doctor} found`); return; }
        }





     const appointment = await appointmentSchema.findOneAndUpdate(
      { patient, doctor,time,date }, // filter
      { status },                      // update
      { new: true, runValidators: true }
    );

        if (!appointment) { console.log(`no appointment Found`); res.status(404).json({ message: `no appointment Found` }); }
        else { console.log("apppointment edited");  res.status(200).json({
            success:true,
            appointment}); }
   
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}




 async function deleteAppointment(req,res){
     // change userid to email
    var role=req.role;
        if(role=="admin"){
    try{
        const appointment =await appointmentSchema.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'appointment not found' });
        res.status(200).json({ message: 'appointment deleted' });
    }
    catch(error){
         res.status(500).json({ error: error.message });
    }}

    else if(role=="patient"){

         try{
        const appointment =await appointmentSchema.findOneAndDelete({patient:req.userId});
        if (!appointment) return res.status(404).json({ message: 'appointment not found' });
        res.status(200).json({ message: 'appointment deleted' });
    }
    catch(error){
         res.status(500).json({ error: error.message });
    }
    }
    else{
        res.status(401).json({ message:"not authorized to delete appointment"  });
    }
 }

async function updateAppointmentStatus(req,res){
     // change userid to email
    try{
        const doctId= req.userId;
        const appointmeantId=req.params.appointmeantId; // pass in params
        const role=req.role;
        const status=req.body.status; // give in body

            // if(role!="doctor"){return res.status(404).json({message:"Only Doctors are allowed to modify status"}) }


        const if_doct_assigneed= await appointmentSchema.findOne({doctor:doctId});
        if(!if_doct_assigneed) { return res.status(404).json({message:"No appointment is assigned to you"})    }

        if( if_doct_assigneed._id == appointmeantId ){
                if_doct_assigneed.status=status;
                await if_doct_assigneed.save();
                return res.status(200).json({updated:if_doct_assigneed  });

        }else{
            return res.status(403).json({message:`no appointment with appointment id=${appointmeantId}`});
        }


    }catch(error){
               res.status(500).json({ error: error.message });
    }
} 


module.exports = {
    createAppointment,
    getAllAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    updateAppointmentStatus
}