import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from "./router/userRoutes.js"
import dataRoutes from "./router/dataRoutes.js"
import cors from "cors";

import dotenv from "dotenv"
dotenv.config();
const app = express();

app.use(cors({
  origin: ['https://eduportal-three.vercel.app',
    'https://eduportal-three.vercel.app/',
    'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user',userRoutes);
app.use('/api/data',dataRoutes);

app.get("/", (req, res) => {
  res.status(201).json({ message: "req has been sent" });
});

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => {
  console.log('Server is running ');
});
