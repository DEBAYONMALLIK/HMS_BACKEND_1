const basic_middleware=require("../middlewares/jws.middleware.js");
const myprof_controller=require("../controllers/myprofile.controller.js")
module.exports=(app)=>{
    app.get("/hms/myprofile/api/v1/get",[basic_middleware.verifyToken],myprof_controller.getMyProfile);// show my profile.
    app.put("/hms/myprofile/api/v1/update",[basic_middleware.verifyToken],myprof_controller.updateMyProfile );// update profile
    app.delete("/hms/myprofile/api/v1/delete",[basic_middleware.verifyToken],myprof_controller.deleteMyProfile); // delete profile
}