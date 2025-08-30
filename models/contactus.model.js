const mongoose= require("mongoose");

const contactUsSchema=new mongoose.Schema({

        name:{
            type:String,
            requied:true
        },
        email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        },
        message:{
            type:String,
            required:true,
        }

},{timestamps:true});

module.exports=mongoose.model("contactus",contactUsSchema);