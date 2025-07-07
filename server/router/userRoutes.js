import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { User, Educator, Session, AcademicData,Behaviour, Achievement } from "../schema/userSchema.js";
import Student from "../schema/studentSchema.js";
import dotenv from "dotenv";
import authenticateJWT from "../middleware/jwtToken.js";
dotenv.config();

const router = express.Router();

const secret = process.env.JWT_SECRET || "your";

router.get("/students", async (req, res) => {
  const results = await Student.aggregate([
    {
      $addFields: {
        totalScore: { $add: ["$literacyscore", "$behavioralScore"] },
      },
    },
    {
      $sort: { totalScore: -1 },
    },
    {
      $group: {
        _id: null,
        students: { $push: "$$ROOT" },
      },
    },
    {
      $unwind: {
        path: "$students",
        includeArrayIndex: "students.rank",
      },
    },
    {
      $replaceRoot: { newRoot: "$students" },
    },
    {
      $project: {
        name: 1,
        literacyscore: 1,
        behavioralScore: 1,
        extracurricularActivities: 1,
        totalScore: 1,
        rank: { $add: ["$rank", 1] },
        _id: 0,
      },
    },
  ]);
  try {
    if (!results) {
      res.status(500).json({ error: "no data" });
    }
    res.json(results);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/session",authenticateJWT, async (req, res) => {
  try {
    //console.log("req:",req)
    const educatorId=req.id
  //console.log("educator:",educatorId);
    const sessions = await Session.find({educatorId});
    //console.log("this",sessions);
    if (!sessions) {
      return res.status(404).json({ error: "No sessions found" });
    }
    res.status(200).json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register/students",authenticateJWT,async (req, res) => {
  try {
    const educatorId=req.id;
    //console.log("educator from st:",educatorId);
    const studentsData = req.body; // Expecting an array of student objects
    
    if (!Array.isArray(studentsData)) {
      return res.status(400).json({
        error: "Invalid data format. Expected an array of student objects.",
      });
    }

    //const results = [];

    for (const studentData of studentsData) {
      //console.log("entered");
      const {
        username,
        password,
        name,
        grade,
        DateOfBirth,
        parentsInformation,
        address,
        caste,
        religion,
        mothertoungue,
        literacyscore,
        behavioralScore,
        extracurricularActivities,
        bloodgroup,
        height,
        weight,
      } = studentData;
      // Check if the user already exists based on the username
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        //results.push({ username, status: "failed", message: "User already exists with this username" });
        continue;
      }

      // Create a new user with role set to 'student'
      //const salt = await bcrypt.genSalt(10);
      //console.log("pass",password);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        role: "student",
      });

      const savedUser = await newUser.save();
            //console.log("user:",savedUser);

      // Create a new student with the user ID reference
      const newStudent = new Student({
        name,
        student_id: savedUser._id, // Reference to the created user
        grade,
        DateOfBirth,
        educatorId,
        parentsInformation,
        address,
        caste,
        religion,
        mothertoungue,
        literacyscore,
        behavioralScore,
        extracurricularActivities,
        bloodgroup,
        height,
        weight,
      });
          //console.log("notsaved:",newStudent);

      await newStudent.save();
      //console.log("saved:",newStudent);
      //results.push({ username, status: "success", message: "Student registered successfully" });
    }
    res
      .status(201)
      .json({ success: true, message: "Students registered successfully" });
    //res.status(201).send(results);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register/educator", async (req, res) => {
  const {
    username,
    name,
    password,
    role,
    email,
    location,
    qualification,
    contact,
  } = req.body;
  if (!name || !password || !email || !location || !qualification) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log("name from register educator",name);
  const existuser = await User.findOne({ email });
  if (existuser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  //console.log(name)
  const newEducator = new Educator({
    name:name,
    email,
    location,
    qualification,
    contact,
  });

  try {
    await newUser.save();
    newEducator.educatorId = newUser._id; // Set the educatorId to the new user's ID
    await newEducator.save();
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, secret, {
      expiresIn: "1h",
    });
    res
      .cookie("accessToken", token, {
        // httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/educator/approve/:id", async (req, res) => {
  const educatorId = req.params.id;
  const { approved } = req.body;
  if (approved === null) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const educator = await Educator.findOneAndUpdate(
      { educatorId },
      { $set: { approved } },
      { new: true }
    );
    if (!educator) {
      return res.status(404).json({ error: "Educator not found" });
    }
    res
      .status(200)
      .json({ message: "Educator updated successfully", educator });
  } catch (error) {
    console.error("Error updating educator:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "username and password are required" });
    return;
  }
  try {
    const newuser = await User.find({ username });
    const user = newuser[0];
    //console.log(user);
    if (!user) {
      return res.status(401).json({ error: " username doesnot exist" });
    }   // console.log("found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      //console.log("entered")
      return res.status(401).json({ error: "Invalid password" });
    }//console.log("matched");
    const role = user.role;
    if (role == "educator") {
      const educator = await Educator.findOne({
        educatorId: user._id.toString(),
      });
      //console.log(educator);
      if (!educator) {
        return res.status(404).json({ error: "Educator not found" });
      }
      const token = jwt.sign({ id: user._id, role }, secret, {
        expiresIn: "1h",
      });
      res
        .cookie("accessToken", token, {
          // httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "Login successful" });
    } else if (role == "student") {
      const student = await Student.findOne({
        student_id: user._id.toString(),
      });
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      // Add token generation and cookie here
      const token = jwt.sign({ id: user._id, role }, secret, {
        expiresIn: "1h",
      });
      res
        .cookie("accessToken", token, {
          // httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "Login successful", user: student });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get student by user ID

router.get("/student",authenticateJWT, async (req, res) => {
  try {
    const educatorId=req.id
    const students = await Student.find({educatorId });
    if (!students) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/student/data",authenticateJWT, async (req, res) => {
  try {
    const student_id=req.id
    const student = await Student.find({student_id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    //console.log("student :",student)
    const academic= await AcademicData.find({studentId:student[0]._id})
if (!academic) {
      return res.status(404).json({ error: "Academic data not found" });
    }
    //console.log("academic",academic)
    res.status(200).json(academic);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/student/behavioural/data",authenticateJWT, async (req, res) => {
  try {
    const student_id=req.id
    const student = await Student.find({student_id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    //console.log("student :",student)
    const academic= await Behaviour.find({studentId:student[0]._id})
if (!academic) {
      return res.status(404).json({ error: "Academic data not found" });
    }
    //console.log("academic",academic)
    res.status(200).json(academic);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
///student/achievement/data

router.get("/student/achievement/data",authenticateJWT, async (req, res) => {
  try {
    const student_id=req.id
    const student = await Student.find({student_id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    //console.log("student :",student)
    const achievement= await Achievement.find({studentId:student[0]._id})
if (!achievement) {
      return res.status(404).json({ error: "Achievement data not found" });
    }
    //console.log("academic",academic)
    res.status(200).json(achievement);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





router.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get educator by user ID
router.get("/educator/:id", async (req, res) => {
  try {
    const educator = await Educator.findOne({ educatorId: req.params.id });
    if (!educator) {
      return res.status(404).json({ error: "Educator not found" });
    }
    res.status(200).json(educator);
  } catch (error) {
    console.error("Error fetching educator:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/session/data", authenticateJWT, async (req, res) => {
  const educatorId = req.id;
  //console.log("secret", educatorId);
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newSesion = new Session({ title, description, educatorId });

  try {
    newSesion.save();
    res.status(201).json({ message: "User created successfully", newSesion });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
