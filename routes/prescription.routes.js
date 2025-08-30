const prescriptionController=require("../controllers/prescription.controller");
const basic_middleware=require("../middlewares/jws.middleware.js")
const role_middleware= require("../middlewares/checkRole.middleware.js");


module.exports=(app)=>{
    app.post("/hms/prescription/api/v1/create",[basic_middleware.verifyToken,role_middleware.checkRole("doctor")],prescriptionController.createPrescription);
    
    app.get("/hms/prescription/api/v1/doctor/view",[basic_middleware.verifyToken,role_middleware.checkRole("doctor")],prescriptionController.viewAllPrescriptionsOfDoctor);

    app.get("/hms/prescription/api/v1/patient/view",[basic_middleware.verifyToken,role_middleware.checkRole("patient")],prescriptionController.viewAllPrescriptionsOfPatient);
    
    
    
    // get all pres of doct
    // get all pres of patient
}