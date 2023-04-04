// for reading, updating, and deleting individual books:

import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/connection";
import Book, { IBook } from "../../../models/Book";

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
        const book: IBook | null = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
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
        const book: IBook | null = await Book.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
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
        const deletedBook = await Book.findByIdAndRemove(id);
        if (!deletedBook) {
          return res.status(404).json({ message: "Book not found" });
        }
        res.status(204).json({ message: "Book deleted" });
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