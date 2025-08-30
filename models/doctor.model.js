const mongoose=require('mongoose');

const doctschema = new mongoose.Schema({
  
      userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
       
      },
    name :{
        type: String,
        required:true,
        trim:true
    },
    tags:{
      type:String,
      
    },

    experience:{
      type:Number,
      default:5,
    },

    review:{
      type:Number,
      default:4.0,
    },
    specialization:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
      },
      isActive:{
        type:Boolean,
         default:true,
      },
      
      availability:{
        days:[String],// monday, tues...
        timeslots:[
          
            {
            start: String, // 12:00  4:00 ..
            end:String,   //2:00    7:00 ..
             _id:false,
            }
    ]
      }
      
},{timestamps:true});
module.exports= mongoose.model("doctor",doctschema);// 