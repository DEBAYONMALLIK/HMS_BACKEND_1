const authController=require("../controllers/auth.controller");
module.exports=(app)=>{
    
app.post("/hms/user/api/v1/signup",authController.signup);
app.post("/hms/user/api/v1/signin",authController.signin);

app.post("/hms/user/api/v1/logout",authController.logout);
}