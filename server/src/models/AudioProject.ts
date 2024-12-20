// src/models/AudioProject.ts
import { Schema, model, Document } from 'mongoose';

interface AudioProject extends Document {
  userId: string;
  title: string;
  audioUrl: string;
  cloudinaryId: string;
}

const audioProjectSchema = new Schema<AudioProject>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  audioUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
});

const AudioProjectModel = model<AudioProject>('AudioProject', audioProjectSchema);

export default AudioProjectModel;
