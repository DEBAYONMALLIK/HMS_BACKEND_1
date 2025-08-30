const contactcontroller=require("../controllers/contactus.controller");

module.exports=(app)=>{
    app.post("/hms/user/api/v1/contactus",contactcontroller.contactus);
}