const mongoose= require("mongoose");

const appointmentSchema= new mongoose.Schema({

    patient:{ //email
        // type:mongoose.Schema.ObjectId,
         type:String, 
        ref:"patient",
        required:true,
    },
    doctor:{ //email
        // type:mongoose.Schema.ObjectId,
        type:String,
        ref:"doctor",
        required:true,
    },

    status:{
        type:String,
        enum:["pending","confirmed", "cancelled", "completed"],
        default:"pending",
    },
    date:{
        type:Date,
        //  required:true,
    },
    time:{
           type:String,
        //    required:true,
    },
    reason:{
        type:String,
    }



},{timestamps:true})
module.exports=mongoose.model("appointment",appointmentSchema);