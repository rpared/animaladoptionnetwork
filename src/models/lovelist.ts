// models/lovelist.ts
import mongoose, { Schema, Document } from 'mongoose';

interface LovelistItem extends Document {
  adopterId: string;
  animalId: string;
}

const LovelistSchema: Schema = new Schema({
  adopterId: { type: String, required: true },
  animalId: { type: String, required: true },
});

export default mongoose.models.Lovelist || mongoose.model<LovelistItem>('Lovelist', LovelistSchema);