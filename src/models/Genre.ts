import mongoose, { Document, Schema } from "mongoose";

export interface IGenre extends Document {
  _id: string;
  name: string;
}

const GenreSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.models.Genre || mongoose.model<IGenre>("Genre", GenreSchema);