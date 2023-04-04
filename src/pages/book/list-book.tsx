import axios from 'axios';
import { DefaultUser } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const ListBook = () => {
  const { data: session } = useSession()
  

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');


  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleCoverUpload', event)
    if (!event.target.files?.length) {
      return
    }
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('cover', file);
  
    try {
      const response = await axios.post('/api/utils/uploadCover', formData);
      console.log('response', response)
      
      setCoverImageUrl(`/uploads/${response.data.data.filename}`);
    } catch (error) {
      console.error('Error uploading cover image:', error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, genre, description, condition, coverImageUrl, owner: (session?.user as DefaultUser).id }),
    });

    if (response.ok) {
      alert('Book listed successfully');
      setTitle('');
      setAuthor('');
      setGenre('');
      setDescription('');
      setCondition('');
      setCoverImageUrl('');
    } else {
      alert('Failed to list the book');
    }
  };

  return (
    <div>
      <h1>List a Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="condition">Condition:</label>
          <input
            type="text"
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input type="file" id='coverImage' name="cover" accept="image/*" onChange={handleCoverUpload} />
        </div>
        <button type="submit">List Book</button>
      </form>
    </div>
  );
};

export default ListBook;