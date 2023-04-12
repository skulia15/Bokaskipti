import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  description: string;
  condition: string;
  coverImageUrl: string;
  owner: string;
  isAvailable: boolean;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: false },
  condition: { type: String, required: true },
  coverImageUrl: { type: String, required: false },
  owner: { type: String, required: true }, 
  // owner: { type: String, ref: "User", required: true },
  isAvailable: { type: Boolean, required: true, default: true },
});

export default mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);