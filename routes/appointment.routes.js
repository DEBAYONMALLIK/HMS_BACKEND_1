const appointController=require("../controllers/appointment.controller");
const basic_middleware=require("../middlewares/jws.middleware.js")
const role_middleware= require("../middlewares/checkRole.middleware.js");

  

function appoint_rout(app){
 app.post("/hms/appointment/api/v1/create",[basic_middleware.verifyToken,role_middleware.checkRole("patient")],appointController.createAppointment);
 
  app.get("/hms/appointment/api/v1/get",[basic_middleware.verifyToken],appointController.getAllAppointment);// pass middleare

  app.get("/hms/appointment/api/v1/getbyid/:id",appointController.getAppointmentById);

  app.put("/hms/appointment/api/v1/update",appointController.updateAppointment);
  app.patch("/hms/appointment/api/v1/onlyUpdateStatus/:appointmeantId",[basic_middleware.verifyToken,role_middleware.checkRole("doctor")],appointController.updateAppointmentStatus)
  app.delete("/hms/appointment/api/v1/delete/:id",[basic_middleware.verifyToken],appointController.deleteAppointment);
// who can perfrom del on appointment
// for patient /hms/appointment/api/v1/delete/(some dummy value)
// for admin  localhost:8080/hms/appointment/api/v1/delete/6825eecb16ebda4e545dc237(actual id of appoint ._id)
}


module.exports={
    appoint_rout,
}