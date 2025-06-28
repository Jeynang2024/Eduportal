import express from "express"
import { User,Educator,Session,AcademicData} from '../schema/userSchema.js';
import  Student  from '../schema/studentSchema.js';

const router = express.Router();

router.post("/academic/data", async (req, res) => {
  const academicData = req.body;
  try {
    if (!Array.isArray(academicData)) {
      return res
        .status(400)
        .json({ error: "Invalid data format. Expected an array." });
    }

    for (const rowdata of academicData) {
      const { username, subjects } = rowdata;
      if (!username || !Array.isArray(subjects)) {
        return res
          .status(400)
          .json({ error: "Each entry must have a username and an array of subjects." });
      }

      const student = await Student.findOne({ username });
      if (!student) {
        return res.status(404).json({ error: `Student ${username} not found` });
      }

      const totalMarks = subjects.reduce(
        (sum, subj) => sum + Number(subj.marks),
        0
      );

      const newAcademic = new AcademicData({
        studentId: student._id,
        subjects,
        username
      });
      await newAcademic.save();

      await Student.updateOne(
        { _id: student._id },
        { $set: { literacyscore: totalMarks } }
      );
    }

    return res.status(201).json({ message: "Academic data added and students updated" });
  } catch (error) {
    console.error("Error during adding data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
