import express from "express"
import { User,Educator,Session,AcademicData} from '../schema/userSchema.js';
import  Student  from '../schema/studentSchema.js';

const router = express.Router();

router.post("/academic/data",async (req,res)=>{
  const academicData= req.body;
  try {
     if (!Array.isArray(academicData)) {
            return res.status(400).json({error :"Invalid data format. Expected an array of student objects."});
        }
        for (const rowdata of academicData) {
            const { username, subjects} = rowdata;
            const StudentUser = await Student.findOne({username});
            const studentId= StudentUser._id;
            const newAcademicdata = new AcademicData({studentId,username,subjects});

            await newAcademicdata.save();

        }
        res.status(201);

    
  } catch (error) {
        console.error("Error during adding data:", error);
        res.status(500).json({ error : "Internal server error"});

  }
});

