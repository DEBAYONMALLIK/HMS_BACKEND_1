const mongoose= require("mongoose");

const adminSchema= new mongoose.Schema({

   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to userModel
    required: true,
    unique: true  // One-to-one link
  },
  
    name: {
        type: String,
        required: true,
        trim: true,
      },
  
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
  
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
  
      superuser: {
        type: Boolean,
        default: false, // Can override other admins
      },
  
      assignedRoles: {
        type: [String],
        enum: ["doctor-manager", "staff-manager", "accountant", "hr", "sysadmin"],
        default: [],
      },
  
      isActive: {
        type: Boolean,
        default: true,
      }
   
}, {timestamps:true,versionKey:false},
)
module.exports=mongoose.model("admin",adminSchema);