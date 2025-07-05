import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {   
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },role:{
    type: String,
    required: true,
  }
},
  { timestamps: false });

const educatorSchema = new mongoose.Schema({
  educatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //student collection reference
    required: true
  },
  approved:{
    type: Boolean,
    default: false // Default value for approved field
  },
  email:{
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  location: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false,
  }
 
 
}, { timestamps: false });

const sessionSchema = new mongoose.Schema({
  title: { type: String,
      unique:true,
     required: true },
  description: { type: String, required: true },
  educatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Educator",
    required: true
  },
  date: { type: Date } // <-- Add this line
}, { timestamps: true });


const AcademicDataSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  username :{
    type: String,
    required:true,

  },
  subjects: [
    {
      subjectName: {
        type: String,
        required: true
      },
      marks: {
        type: Number,
        required: true
      }
    }
  ]
});


const behaviorDataSchema= new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  username :{
    type: String,
    required:true,

  },
  criteria: [
    {
      Name: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    }
  ]
});

  
const User = mongoose.model("User", userSchema);
const Behaviour=mongoose.model("Behaviour", behaviorDataSchema);
const Educator = mongoose.model("Educator", educatorSchema);
const Session = mongoose.model("Session", sessionSchema);
const AcademicData = mongoose.model("AcademicData", AcademicDataSchema);
export {User,Educator,Session,AcademicData,Behaviour};