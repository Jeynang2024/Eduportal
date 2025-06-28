import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { User,Educator,Session,AcademicData} from '../schema/userSchema.js';
import dotenv from "dotenv";
import authenticateJWT from '../middleware/jwtToken.js';
dotenv.config();


const router=express.Router();

const secret=process.env.JWT_SECRET || "your";


router.post('/register/educator', async (req, res) => {
  
  const {username, name, password ,role, email, location ,qualification,contact} = req.body;
    if (!name || !password || !email || !location || !qualification) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const existuser= await User.findOne({ email });
    if (existuser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    const newEducator = new Educator({ email, location, qualification, contact });

    try {
       await newUser.save();
        newEducator.educatorId = newUser._id; // Set the educatorId to the new user's ID
       await newEducator.save() ;
       const token = jwt.sign({ id: newUser._id, role: newUser.role }, secret, {
        expiresIn: '1h'
        });
      res.cookie('accessToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000                         
        }).status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/educator/approve/:id', async (req, res) => {
    const educatorId = req.params.id;
    const { approved } = req.body;
    if (approved===null) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
const educator = await Educator.findOneAndUpdate(
      { educatorId },                     
      { $set: { approved } },
      { new: true }                      
    );
        if (!educator) {
            return res.status(404).json({ error: 'Educator not found' });
        }
        res.status(200).json({ message: 'Educator updated successfully', educator });
    } catch (error) {
        console.error('Error updating educator:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login',async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'username and password are required' });
        return;
    }
    try {
        const newuser = await User.find({ username });
        const user = newuser[0];
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: ' username doesnot exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const role= user.role;
        if(role=='educator'){
            const educator = await Educator.findOne({ educatorId: user._id.toString() });
            console.log(educator);
            if (!educator) {
                return res.status(404).json({ error: 'Educator not found' });
            }
            const token = jwt.sign({ id: user._id, role }, secret, {
           expiresIn: '1h'
        });
            res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000                         
        }).status(200).json({ message: 'Login successful' });
        }else if(role=='student'){
             const student = await Student.findOne({ studentId: user._id.toString() });
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.status(200).json({ message: 'Login successful', user:student });
        }

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/session/data',authenticateJWT, async (req, res) => {
    const  educatorId = req.id;
    console.log("secret",educatorId);
  const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newSesion = new Session({ title,description, educatorId });

    try {
        newSesion.save() ;
        res.status(201).json({ message: 'User created successfully', newSesion });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;

