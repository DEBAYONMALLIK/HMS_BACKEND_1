const dashboard= require("../controllers/admindashboard");
const basic_middleware=require("../middlewares/jws.middleware.js")
const role_middleware= require("../middlewares/checkRole.middleware.js");

module.exports=(app)=>{
    app.get("/hms/admin/api/v1/dashboard",[basic_middleware.verifyToken,role_middleware.checkRole("admin")],dashboard.adminDashboardOverview);
}