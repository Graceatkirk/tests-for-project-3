// src/routes/upload.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import AudioProjectModel from '../models/AudioProject';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('audioFile'), async (req: Request, res: Response) => {
  try {
    const result = await cloudinary.uploader.upload(req.file!.path, {
      resource_type: 'auto', // Automatically detect file type (audio, video, etc.)
    });

    const audioProject = new AudioProjectModel({
      userId: req.body.userId,
      title: req.body.title,
      audioUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await audioProject.save();
    res.status(200).json(audioProject);
  } catch (error) {
    res.status(500).send('Error uploading audio file');
  }
});

export default router;
