import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { IBook } from '@/models/Book';
import Image from 'next/image';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';
import { IGenre } from '@/models/Genre';

interface IAvailableBooksProps {
  books: Array<IBook>;
}
const BookItem = ({ book }: { book: IBook }) => {
  const router = useRouter()

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => router.push(`/book/${book._id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={book.coverImageUrl}
          alt="Book Cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const AvailableBooks = ({ books }: IAvailableBooksProps) => {
  return (
    <div className='container'>
      <Head>
        <title>Available Books</title>
      </Head>

      <h1>Available Books</h1>
      <div>
        {books.map((book: IBook) => (
          <BookItem book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
};

export default AvailableBooks;

export async function getServerSideProps() {
  const bookResponse = await axios.get(process.env.API_URL + '/books');
  const books = bookResponse.data;


  return {
    props: {
      books
    },
  };
}