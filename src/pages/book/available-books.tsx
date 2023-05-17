import React from 'react';
import Head from 'next/head';
import { IBook } from '@/models/Book';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '@/styles/AvailableBooks.module.css';

interface IAvailableBooksProps {
  books: Array<IBook>;
}
const BookItem = ({ book }: { book: IBook }) => {
  const router = useRouter()

  return (
    <Grid item xs={2}>
      <Card className={styles.bookCard}>
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
            {/* <Typography variant="body2" color="text.secondary" className={styles.bookDescription}>
              {book.description}
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};


const AvailableBooks = ({ books }: IAvailableBooksProps) => {
  return (
    <div className={`${styles.main}`}>
      <Head>
        <title>Available Books</title>
      </Head>

      <h1 className={styles.title}>Available Books</h1>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={styles.bookGrid}>
        {books.map((book: IBook) => (
          // <BookItem book={book} key={book._id} />
          <BookItem book={book} key={book._id} />
        ))}
      </Grid>
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