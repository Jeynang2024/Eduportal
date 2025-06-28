import mongoose from "mongoose";



const studentSchema = new mongoose.Schema({
  name: String,required: true,
  student_id: { type: mongoose.Schema.Types.ObjectId },
  grade: String,required: true,
  DateOfBirth: Date,required: true,
  parentsInformation
: {
    fatherName: String,
    motherName: String,
    contactNumber: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    required: true
  },
  caste: String,required: true,
  religion: String,required: true,
  mothertoungue: String,required: true,
  literacyscore: Number,default: 0,required: true,
  behavioralScore: Number,default: 0,
  extracurricularActivities: [String],
  bloodgroup: String,
  height: Number,
  weight: Number,}
);
module.exports = mongoose.model('Student', studentSchema);