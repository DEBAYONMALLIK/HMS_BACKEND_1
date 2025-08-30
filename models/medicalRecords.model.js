const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({

  patient: {
    type: String,
    ref: 'Patient',
    required: true,
    unique: true, // Each patient has one medical record
  },
  allergies: [String],
  pastSurgeries: [String],
  chronicDiseases: [String],

  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  height: Number, // in cm

weight:[{
       month: {
              type: String,
              required: true,
              },
      weight: {
              type: Number,
              required: true,
              }
}], // in kg



healthStats:[
{   
  name: { type: String,
             
              },

     value: {
              type: Number,
         
              }
}
  ],

    medications:[String] ,// Current medications

    healthMeter:{
      type:Number,
    },

  createdAt: {
    type: Date,
    default: Date.now,
  },


healthMeter:Number,

  updatedAt: Date,
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
