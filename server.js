const express=require('express');
const mongoose=require("mongoose");
const dbconfig=require("./configs/db.config.js")
const adminModel=require("./models/admin.model.js")
const userModel=require("./models/user.model.js");
const doctRoutes= require("./routes/doctor.routes.js")
const patiRoutes=require("./routes/patient.routes.js")
const appointmentRoutes=require("./routes/appointment.routes.js")
const authRoutes=require("./routes/auth.routes.js");
const myprofile=require("./routes/myprofile.route.js");
const adminRoutes=require("./routes/admin.routes.js");
const prescriptionRoutes=require("./routes/prescription.routes.js");
const medicalRecrodsRoute=require("./routes/medicalRecords.routes.js");
const contactusRoute=require("./routes/contactUs.routes.js")
const cors = require("cors");
const cookieParser = require("cookie-parser");



require('dotenv').config(); // this will read the .env file and populate process.env


const serverport=require("./configs/port.config.js");
const app=express();
const bcryptjs=require("bcryptjs");
app.use(cors({
  origin:"https://hms-frontend-1.vercel.app",   // frontend origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// mongoose.connect(dbconfig.DB_URL);
const mongo_ATLAS_URL="mongodb+srv://debayonmallik9932_db_user:z5D3qowA0ibxuoOu@clusterhms.fm4t3bs.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHMS"
mongoose.connect(mongo_ATLAS_URL).then(()=>{console.log("connected to DB")}).catch((error)=>{console.log("CAN'T CONNECT TO DBS",error)});
const db=mongoose.connection;

db.once("open",()=>{console.log("connected to mongodb")
    init();// initialization
})
db.on("error",()=>{console.log("error in connection")})

async function init(){
    try{  // no admin in user table
        const user_reg= await userModel.findOne({role:"admin"});

        if(user_reg) {
             console.log("admin is present");
            return ;
        }
    }catch(err){
        console.log("error in user collection");
    }



    try{

         var new_user={
             name:"DEBAYON",
            email:process.env.ADMIN_EMAIL,
            password:bcryptjs.hashSync(process.env.ADMIN_PASS,10),
            role:"admin"

         }
            var admin_user= await userModel.create(new_user);
            console.log("new_admin_registered",admin_user);

            const user_admin= await userModel.findOne({email:process.env.ADMIN_EMAIL});
        //   console.log("id=",user_admin._id);

        var new_admin={// give id
            userId: user_admin._id,
            name:"DEBAYON",
            email:process.env.ADMIN_EMAIL,
            password:bcryptjs.hashSync(process.env.ADMIN_PASS,10),
            superuser:true,
            assignedRoles:["doctor-manager", "staff-manager", "accountant", "hr", "sysadmin"],
            isActive:true,

        }
        var admin= await adminModel.create(new_admin);
        console.log("admin created sucessfully ",admin)

    }catch(err){console.log("error while creating admin")};

}


doctRoutes(app);
patiRoutes(app);
authRoutes(app);
myprofile(app);
adminRoutes(app);
contactusRoute(app);
appointmentRoutes.appoint_rout(app);
prescriptionRoutes(app);
medicalRecrodsRoute(app);

const port=process.env.PORT || 8080;

app.listen(port,()=>{console.log("server has started at",port)});