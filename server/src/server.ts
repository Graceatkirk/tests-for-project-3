// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import uploadRouter from './routes/upload';

dotenv.config();

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
