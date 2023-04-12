//IMPORT MONGOOSE
import { ObjectId } from "mongodb"
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  // OUR TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  })

  const UserSchema = new mongoose.Schema({
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
  })


  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)
  const User = mongoose.models.User || mongoose.model("User", UserSchema)

  return { conn, Todo, User }
}