import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from "./router/userRoutes.js"
const app = express();




app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user',userRoutes);



mongoose.connect('mongodb://localhost:27017/mydata')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});