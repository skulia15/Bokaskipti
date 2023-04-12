import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from "../../../../utils/connection";
import Genre from '@/models/Genre';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  switch (req.method) {
    case "GET":
      try {
        const genres = await Genre.find({});
        res.status(200).json(genres);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching genres' });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}