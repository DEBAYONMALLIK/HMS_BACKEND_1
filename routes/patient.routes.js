const patient_controller=require("../controllers/patient.controller.js")
const basic_middleware=require("../middlewares/jws.middleware.js")
const role_middleware= require("../middlewares/checkRole.middleware.js");

module.exports=(app)=>{
        app.post("/hms/patient/api/v1/create",patient_controller.createPatient);
        app.get("/hms/patient/api/v1/get",patient_controller.getAllPatients);
        app.get("/hms/patient/api/v1/getbyemail",patient_controller.getPatientByEmail);
        app.put("/hms/patient/api/v1/update/:email",[basic_middleware.verifyToken,role_middleware.checkRole(["admin","doctor"])],patient_controller.updatePatient);
        app.delete("/hms/patient/api/v1/delete/:email",patient_controller.deletePatient);
        app.post("/hms/patient/api/v1/addDetails",[basic_middleware.verifyToken,role_middleware.checkRole("patient")],patient_controller.createPatient);// add full details of patient
}