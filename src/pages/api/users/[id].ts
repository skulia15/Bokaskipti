// for reading, updating, and deleting individual Users:

import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/connection";
import User, { IUser } from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user: IUser | null = await User.findOne({ googleId: id});
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      }
      catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "An unknown error occurred." });
        }
      }
      break;
    case "PUT":
      try {
        const user: IUser | null = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      }
      catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "An unknown error occurred." });
        }
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndRemove(id);
        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(204).json({ message: "User deleted" });
      }
      catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "An unknown error occurred." });
        }
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}