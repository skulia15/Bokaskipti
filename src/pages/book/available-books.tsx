import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { IBook } from '@/models/Book';
import Image from 'next/image';
import axios from 'axios';

interface IAvailableBooksProps {
  books: Array<IBook>;
}

const AvailableBooks = ({ books }: IAvailableBooksProps) => {
  return (
    <div>
      <Head>
        <title>Available Books</title>
      </Head>

      <h1>Available Books</h1>
      <div>
        {books.map((book) => (
          <div key={book._id} style={{height: '200px', width: '400px', border: '1px solid red'}}>
            <Link href={`/book/${book._id}`}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Condition: {book.condition}</p>
              {book.coverImageUrl && (
                <div style={{ position: 'relative', height: '120px'}}>
                  <Image src={book.coverImageUrl} alt={book.title} fill style={{ objectFit: 'contain'}} />
                </div>)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableBooks;

export async function getServerSideProps() {
  const response = await axios.get(process.env.API_URL + '/books');
  const books = response.data;

  return {
    props: {
      books,
    },
  };
}