import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IBook } from '@/models/Book';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import styles from '@/styles/BookDetail.module.css';
import { IUser } from '@/models/User';

interface BookDetailProps {
  book: IBook;
  user: IUser;
}


const BookDetail = ({ book, user }: BookDetailProps) => {
  return (
    <div className='container'>
      <h1>{book.title}</h1>
      <h2>Author: {book.author}</h2>
      <h3>Genre: {book.genre}</h3>
      <p>Description: {book.description}</p>
      <p>Condition: {book.condition}</p>
      <p>Owner: {user.username}</p>
      <p>{book.isAvailable ? 'Available' : 'Not Available'}</p>
      <Image className={styles.coverImage} src={book.coverImageUrl} alt={book.title} height={180} width={100} />
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
    const bookRes = await axios.get(`${process.env.API_URL}/books/${bookId}`);
    const book = bookRes.data;
    console.log(book)

    const userRes = await axios.get(`${process.env.API_URL}/users/${book.owner}`);
    const user = userRes.data;
    console.log(user)
    return {
      props: {
        book,
        user
      },
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return {
      notFound: true,
    };
  }
};

export default BookDetail;