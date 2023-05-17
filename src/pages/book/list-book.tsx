import { Autocomplete, Box, Button, Card, CardMedia, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { DefaultUser } from 'next-auth';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListBook.module.css';
import { useRouter } from 'next/router';
import { IGenre } from '@/models/Genre';

interface IListBookProps {
  genres: Array<IGenre>;
}

const ListBook = ({ genres }: IListBookProps) => {

  const { data: session, status } = useSession()
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<IGenre | null>(null);
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const router = useRouter()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return signIn()
  }
  // useEffect(() => {
  //   console.log('sessionData', session)
  //   if (!(session || status === "loading")) {
  //     router.push("/login")
  //   } else if (router.pathname === "/admin" && !session?.user) {
  //     router.push("/unauthorized")
  //   }
  // }, [session, status, router])

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      router.push('/book/available-books')
    } else {
      alert('Failed to list the book');
    }
  };

  return (
    <div className={`${styles.main}`}>
      <div className='container'>
        {/* <Typography variant="h4" component="h1" gutterBottom> */}
        <h1 className={styles.title}>Add Your Book to the StorySwap Exchange</h1>
        {/* </Typography> */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, pb: 20 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          {/* <TextField
          fullWidth
          margin="normal"
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        /> */}
          <FormControl fullWidth>
            <Autocomplete
              id="genre"
              options={genres}
              getOptionLabel={(option) => option.name}
              value={genres.find((option) => option.name === genre) || null}
              // isOptionEqualToValue={(option, value) => option.name === value}
              onChange={(event, newValue) => {
                setGenre(newValue ? newValue.name : '');
              }}
              renderInput={(params) => (
                <TextField {...params} label="Genre" required />
              )}
            />
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <input
              style={{ display: 'none' }}
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
            />
            <Button variant="contained" component="label" htmlFor="coverImage">
              Upload Cover Image
            </Button>
          </FormControl>
          {coverImageUrl && (
            <Card sx={{ width: 120, height: 180, mt: 2 }}>
              <CardMedia component="img" height="100%" image={coverImageUrl} alt="Cover Image" />
            </Card>
          )}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" type="submit">
              Add to StorySwap
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ListBook;

export async function getServerSideProps() {
  const genresResponse = await axios.get(process.env.API_URL + '/genres');
  const genres = genresResponse.data;
  // genres.push('---')

  return {
    props: {
      genres
    },
  };
}