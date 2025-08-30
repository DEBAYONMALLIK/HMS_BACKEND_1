const mongoose = require("mongoose");

const prescriptionSchema= new mongoose.Schema({

    patient:{
        type:mongoose.Types.ObjectId,
        ref:"patient",
        required:true,

    },
    doctor:{
             type:mongoose.Types.ObjectId,
          ref:"doctor",
           required:true,
    },

    medications:[
        {
               name:"string", // name of mefdi
               dosage:"string", // 500mg
               frequency:"string", // two times a day
               duration :"string", // for 30 days
               _id:false,
        }
    ],
    dateissued:{
       type:Date,
       default:Date.now
    },
    notes:{
        type:String,
    }



})

module.exports=mongoose.model("prescription",prescriptionSchema);