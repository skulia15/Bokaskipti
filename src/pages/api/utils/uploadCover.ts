import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import { MulterApiRequest } from '../../../../utils/customTypes';

const upload = multer({ dest: 'public/uploads/' });

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, _, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

handler.use(upload.single('cover'));

handler.post((req: MulterApiRequest, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file was provided in the request.' });
    return;
  }
  res.status(200).json({ data: req.file });
});

export default handler;

export const config = {
  api: {
    bodyParser: false
  }
}