import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId },
  grade: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
  educatorId: {
      type: mongoose.Schema.Types.ObjectId,
       //student collection reference
      required: true
    },
  parentsInformation: {
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  caste: { type: String, required: true },
  religion: { type: String},
  mothertoungue: { type: String },
  literacyscore: { type: Number, default: 0, required: true },
  behavioralScore: { type: Number, default: 0 },
  extracurricularActivities: [{ type: String }],
  bloodgroup: { type: String },
  height: { type: Number },
  weight: { type: Number },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;