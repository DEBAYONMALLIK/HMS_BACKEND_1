const mongoose=require("mongoose");

const patient_schema= new mongoose.Schema({
     userId:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
          },
    name:{
        type:String,
        required:true,
        trim:true,

    },
    dob:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Others"]
    },
    contact:{
        type:String,
        required:true,
        unique: true,
        // regular expression
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
    },
    medical_history:[ {
        date:{type:Date},
        diagnosis:{type:String},
        treatment:{type:String},
        medicine:[String],
        notes :{type:String},
         _id:false,
    }  ],
    assigned_doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor',
       
    }
    



},{timestamps:true});
const patient_model  =   mongoose.model('patient',patient_schema);

module.exports=patient_model;