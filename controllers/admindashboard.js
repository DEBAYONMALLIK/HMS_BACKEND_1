const userModel=require("../models/user.model");
const doctorModel=require("../models/doctor.model");
const patientModel=require("../models/patient.model");
const appointmentModel=require("../models/appointment.model");

async function adminDashboardOverview(req,res){

try{
  const  totalUsers= await userModel.countDocuments();
  const  totalDoctors= await doctorModel.countDocuments();
  const  totalPatients= await patientModel.countDocuments();
  const  totalAppointments=await appointmentModel.countDocuments();
    const pendingAppointments = await appointmentModel.countDocuments({ status: "pending" });
    const approvedAppointments = await appointmentModel.countDocuments({ status: "confirmed" });
    const rejectedAppointments = await appointmentModel.countDocuments({ status: "rejected" });
        return res.status(200).json({
      totalUsers,
      totalDoctors,
      totalPatients,
      appointments: {
        total: totalAppointments,
        pending: pendingAppointments,
       confirmed: approvedAppointments,
        rejected: rejectedAppointments
      }
    });


}catch(error){
  return res.status(500).json({ error: "Server Error" });
}


}

module.exports={
    adminDashboardOverview,
}