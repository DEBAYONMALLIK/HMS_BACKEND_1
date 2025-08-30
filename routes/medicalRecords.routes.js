const medicalRecordModel=require("../controllers/medicalRecords.controller");
const basic_middleware=require("../middlewares/jws.middleware.js")
const role_middleware= require("../middlewares/checkRole.middleware.js");

module.exports=(app)=>{
    app.post("/hms/medicalrecord/api/v1/create/:patient",[basic_middleware.verifyToken,role_middleware.checkRole("admin")],medicalRecordModel.createMedicalRecord);
    app.get("/hms/medicalrecord/api/v1/get",[basic_middleware.verifyToken,role_middleware.checkRole("patient")],medicalRecordModel.findMedicalRecord );
        app.get("/hms/medicalrecord/api/v1/all/get",[basic_middleware.verifyToken,role_middleware.checkRole("admin")],medicalRecordModel.findMedicalRecords );
}