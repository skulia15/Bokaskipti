import { NextApiRequest } from 'next';


export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface MulterApiRequest extends NextApiRequest {
  file: File;
}