import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IBook } from '@/models/Book';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';

interface BookDetailProps {
  book: IBook;
}


const BookDetail = ({ book }: BookDetailProps) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <h2>Author: {book.author}</h2>
      <h3>Genre: {book.genre}</h3>
      <p>Description: {book.description}</p>
      <p>Condition: {book.condition}</p>
      <p>Owner: {book.owner}</p>
      <p>Availability: {book.isAvailable ? 'Available' : 'Not Available'}</p>
      <Image src={book.coverImageUrl} alt={book.title} height={220} width={150}  style={{ objectFit: 'contain'}} />
    </div>
  );
};

interface BookIdParams extends ParsedUrlQuery {
  bookId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params || !('bookId' in context.params)) {
    return {
      notFound: true,
    };
  }
  
  const { bookId } = context.params as BookIdParams;
  try {
    const res = await axios.get(`${process.env.API_URL}/books/${bookId}`);
    const book = res.data;
    return {
      props: { book },
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return {
      notFound: true,
    };
  }
};

export default BookDetail;