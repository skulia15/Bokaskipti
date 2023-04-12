import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  googleId: string;
  username: string;
  email: string;
  wishList: string[];
  joined: string;
}

const UserSchema: Schema = new Schema({
  googleId: String,
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    wishList: Array<ObjectId>, // Array of book _id references
    joined: Date
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);