import express from "express";
import {
  User,
  Educator,
  Session,
  AcademicData,
  Behaviour,
} from "../schema/userSchema.js";
import Student from "../schema/studentSchema.js";

const router = express.Router();

router.post("/academic/data", async (req, res) => {
  const academicData = req.body;
  try {
    if (!Array.isArray(academicData)) {
      return res
        .status(400)
        .json({ error: "Invalid data format. Expected an array." });
    }

    console.log("Received academic data:", academicData);

    for (const rowdata of academicData) {
      const { username, subjects } = rowdata;
      console.log("Processing rowdata:", rowdata);
      if (!username || !Array.isArray(subjects)) {
        return res
          .status(400)
          .json({
            error: "Each entry must have a username and an array of subjects.",
          });
      }

      const user = await User.findOne({ username });
      const student = await Student.findOne({student_id: user._id});
      if (!student) {
        console.log(`Student ${username} not found`); 
        return res.status(404).json({ error: `Student ${username} not found` });
      }

      // Calculate total marks and normalize to percentage (each subject out of 100)
      const totalMarks = subjects.reduce(
        (sum, subj) => sum + Number(subj.marks),
        0
      );
      const maxMarks = subjects.length * 100;
      const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

      const newAcademic = new AcademicData({
        studentId: student._id,
        subjects,
        username,
      });
      await newAcademic.save();

      await Student.updateOne(
        { _id: student._id },
        { $set: { literacyscore: percentage } }
      );
    }

    return res
      .status(201)
      .json({ message: "Academic data added and students updated" });
  } catch (error) {
    console.error("Error during adding data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/behaviour/data", async (req, res) => {
  const totalData = req.body;
  try {
    if (!Array.isArray(totalData)) {
      return res
        .status(400)
        .json({ error: "Invalid data format. Expected an array." });
    }

    for (const rowdata of totalData) {
      const { username, criteria } = rowdata;
      if (!username || !Array.isArray(criteria)) {
        return res
          .status(400)
          .json({
            error: "Each entry must have a username and an array of subjects.",
          });
      }

      const user = await User.findOne({ username });
      const student = await Student.findOne({student_id: user._id});
      if (!student) {
        return res.status(404).json({ error: `Student ${username} not found` });
      }

      // Calculate total behavioural score and normalize to percentage (each criteria out of 10)
      const totalScore = criteria.reduce(
        (sum, crit) => sum + Number(crit.score),
        0
      );
      const maxScore = criteria.length * 10;
      const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

      const newBehaviour = new Behaviour({
        studentId: student._id,
        criteria,
        username,
      });
      await newBehaviour.save();

      await Student.updateOne(
        { _id: student._id },
        { $set: { behavioralScore: percentage } }
      );
    }

    return res
      .status(201)
      .json({ message: "Behavioural data added and students updated" });
  } catch (error) {
    console.error("Error during adding data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
