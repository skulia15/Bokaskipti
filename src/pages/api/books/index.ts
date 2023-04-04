import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/connection";
import Book, { IBook } from "../../../models/Book";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  switch (req.method) {
    case "GET":
      const books = await Book.find({});
      res.status(200).json(books);
      break;
    case "POST":
      const book: IBook = new Book(req.body);
      await book.save();
      res.status(201).json(book);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
