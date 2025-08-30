const doctController= require("../controllers/doctor.controller.js")
const basic_middleware=require("../middlewares/jws.middleware.js");
const role_middleware= require("../middlewares/checkRole.middleware.js");
module.exports=(app)=>{
    app.post("/hms/doct/api/v1/create", [basic_middleware.verifyToken,role_middleware.checkRole(["doctor", "admin"])],doctController.createDoctor);
    //  app.get("/hms/doct/api/v1/get",  [basic_middleware.verifyToken,role_middleware.checkRole(["doctor", "admin","patient"])] , doctController.getAllDoctor);
    app.get("/hms/doct/api/v1/get", doctController.getAllDoctor);
    app.get("/hms/doct/api/v1/getbyemail",doctController.getDoctorByEmail);
    app.put("/hms/doct/api/v1/update/:email", [basic_middleware.verifyToken,role_middleware.checkRole(["doctor", "admin"])],doctController.updateDoctor);
    app.delete("/hms/doct/api/v1/delete/:email", doctController.deleteDoctor);
    app.post("/hms/doct/api/v1/addDetails", [basic_middleware.verifyToken,role_middleware.checkRole(["doctor","admin" ])] , doctController.createDoctor );// further details of doctor
} 